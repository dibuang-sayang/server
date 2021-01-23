
const { Cart, sequelize , Product} = require("../../models")
const { authentication } = require("../../helpers/authentication")

module.exports = authentication(async (_,args, {user}) => {
    const transaction = await sequelize.transaction()
    try {
        const allUserCarts = await Cart.findAll({
            where : {
                UserId: user.id
            },
            include : ["Product"]
        })
        const errors = []
        const toBeExecute = []
        const fixQuantity = []
        allUserCarts.forEach(cart => {
            if(cart.quantity <= cart.Product.stock){
                const finalStock = cart.Product.stock - cart.quantity
                const productId = cart.Product.id
                const updateStockOfProduct = Product.update({stock : finalStock}, {
                    where : {
                        id : productId
                    },
                    returning : true,
                    transaction
                })
                const updateStatusOfCart = Cart.update({status : "lunas"}, {
                    where : {
                        id : cart.id
                    },
                    returning : true,
                    transaction
                })
                toBeExecute.push(updateStockOfProduct)
                toBeExecute.push(updateStatusOfCart)
            }
            else {
                fixQuantity.push(Cart.update({quantity: cart.Product.stock}), {where: { id: cart.id }})
                errors.push(`gagal beli ${cart.Product.name}`)
            }

        });
        const result = await Promise.all(toBeExecute)
        if(errors.length > 0) {
            await Promise.all(fixQuantity)
            throw new Error("ada yang salah")
        }
        await transaction.commit()
        return {msg : "succes CheckOut"}
        
    } catch (error) {
        await transaction.rollback()
        return error
    }
})
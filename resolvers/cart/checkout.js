
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
                console.log(finalStock);
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
                errors.push(`gagal beli ${cart.Product.name}`)
            }

        });
        const result = await Promise.all(toBeExecute)
        if(errors.length > 0) {
            throw new Error("ada yang salah")
        }
        await transaction.commit()
        console.log(result);
        return {msg : "succes CheckOut"}
        
    } catch (error) {
        await transaction.rollback()
        return error
    }
})
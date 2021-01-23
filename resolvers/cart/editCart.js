const { Cart } = require("../../models")
const { authentication } = require("../../helpers/authentication")
const { authorizationIdCart } = require("../../helpers/authorizationCartId")

module.exports = authentication(authorizationIdCart(async (_,args, {user}) =>{
    console.log(args);
    try {
        const cartId = args.id
        const {
            ProductId,
            quantity,
            status
        } = args.data
        const newData = {
            UserId : user.id,
            ProductId,
            quantity,
            status
        }
        console.log(newData);
        const findCart = await Cart.findOne({
            where : {
                id : cartId
            },
            include : ["Product"]
        })
        console.log(findCart.Product.stock);
        console.log(quantity);
        if(quantity > findCart.Product.stock) throw new Error("terlalu banyak ")
        const editedData = await Cart.update(newData, {
            where : {
                id : cartId
            },
            returning : true
        })
        
        return editedData[1][0].dataValues
    } catch (error) {
        return error
    }
}))
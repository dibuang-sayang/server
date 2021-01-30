const { Cart } = require("../../models")
const { authentication } = require("../../helpers/authentication")
const { authorizationIdCart } = require("../../helpers/authorizationCartId")

module.exports = authentication(authorizationIdCart(async (_,args) =>{
   try {
       const cartId = args.id
       const userCartByCartId = await Cart.findOne({
           where : {
               id : cartId
           }
       })
    return userCartByCartId
   } catch (error) {
       return error
   }
}))
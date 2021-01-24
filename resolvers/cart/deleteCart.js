const { Cart } = require("../../models")
const { authentication } = require("../../helpers/authentication")
const { authorizationIdCart } = require("../../helpers/authorizationCartId")

module.exports = authentication(authorizationIdCart (async(_,args, {user} ) => {
    try {
        console.log(args.id, 'ini di resolver');
        const cartId = args.id
        const deletedData = await Cart.destroy({
            where : {
                id : cartId
            }
        })
        let message = null
        deletedData ? message = { msg : "succes delete data"} : message = { msg: "cart not found"}
        return message
    } catch (error) {
        return error
    }
}))
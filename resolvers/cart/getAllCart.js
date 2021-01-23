const { Cart } = require("../../models")
const { authentication } = require("../../helpers/authentication")

module.exports = authentication(async (_,args, {user}) => {
    try {
        const findUserCart = await Cart.findAll({
            where : {
                UserId : user.id
            }
        })
        return findUserCart
    } catch (error) {
        return error
    }
})
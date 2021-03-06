const { Cart } = require("../../models")
const { authentication } = require("../../helpers/authentication")

module.exports = authentication(async (_,args, {user}) => {
    try {
        const findUserCart = await Cart.findAll({
            where : {
                UserId : user.id
            },
            include : ["Product"],
            order :[["id","ASC"]]
        })
        return findUserCart
    } catch (error) {
        return error
    }
})
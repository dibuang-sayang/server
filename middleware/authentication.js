const { tokenVerify } = require("../helpers/jwtHelper")
const {User} = require("../models")

async function findUserFromToken(token) {
    try {
        const user = tokenVerify(token)
        const loginUser = await User.findOne({
            where : {
                id : user.id
            }
        })
        return loginUser
    } catch (error) {
        return null
    }
}

module.exports = {
    findUserFromToken
}
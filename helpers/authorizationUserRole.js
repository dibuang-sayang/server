const {AuthenticationError} = require('apollo-server')
const {User} = require("../models")
const { tokenVerify } = require("./jwtHelper")

const authorizationUserRole = (role,next) => async (root,args,ctx,info) => {
    const token = ctx.req.headers.token
    const userLogin = tokenVerify(token)
    console.log(role, "<<<< ini role")
    const user = await User.findOne({
        where : {
            id : userLogin.id
        }
    })
    const roleLogin = user.dataValues.role
    console.log(roleLogin);
    if(roleLogin === role[0] || roleLogin === role[1]){
        return next(root,args,ctx,info)
    }else {
        throw new AuthenticationError("unauthorize acces")
    }
}

module.exports = {
    authorizationUserRole
}
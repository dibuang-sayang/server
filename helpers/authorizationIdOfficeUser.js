const {AuthenticationError} = require('apollo-server')
const {Office} = require("../models")
const { tokenVerify } = require("./jwtHelper")

const authorizationIdOfficeUser = (next) => async (root,args,ctx,info) => {
    const token = ctx.req.headers.token
    const officeId = args.id
    const userLogin = tokenVerify(token)
    const checkedOffice = await Office.findOne({
        where : {
            id: officeId
        }
    })
    if(!checkedOffice) throw new AuthenticationError("data not found")
    const owner = checkedOffice.dataValues.UserId
    console.log(userLogin.id,owner);
    if( userLogin.id === owner) {
        return next(root,args,ctx,info)
    }else {
        throw new AuthenticationError( "unauthorize access")
    }
}


module.exports = {
    authorizationIdOfficeUser
}
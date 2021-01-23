const {AuthenticationError} = require('apollo-server')
const {Cart} = require("../models")
const { tokenVerify } = require("./jwtHelper")

const authorizationIdCart = (next) => async (root,args,ctx,info) => {
    const token = ctx.req.headers.token
    const cartId = args.id
    const userLogin = tokenVerify(token)
    const checkedCart = await Cart.findOne({
        where : {
            id: cartId
        }
    })
    if(!checkedCart) throw new AuthenticationError("data not found")
    const owner = checkedCart.dataValues.UserId
    if( userLogin.id === owner) {
        return next(root,args,ctx,info)
    }else {
        throw new AuthenticationError( "unauthorize access")
    }
}


module.exports = {
    authorizationIdCart
}
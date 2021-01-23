const {AuthenticationError} = require('apollo-server')
const {Office, Product} = require("../models")
const { tokenVerify } = require("./jwtHelper")
const { Op } = require("sequelize");

const authorizationProduct = (next) => async (root,args,ctx,info) =>{
    const token = ctx.req.headers.token
    const user = tokenVerify(token)
    const productId = args.id
    const officeData = await Office.findOne({
        where : {
            UserId : user.id
        }
    })
    const officeId = officeData.id

    const productTryToAccess = await Product.findOne({
        where : {
            [Op.and]: [
                {id : productId},
                {OfficeId : officeId}
            ]
        }
    })
    if(!productTryToAccess) throw new AuthenticationError("unauthorize access")

    return next(root,args,ctx,info)

}

module.exports = {
    authorizationProduct
}
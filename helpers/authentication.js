const {AuthenticationError} = require('apollo-server')
const { tokenVerify } = require("./jwtHelper")


const authentication =  (next) => (root,args, context, info) => {
    const token = context.req.headers.token
    if(token) {
        const user = tokenVerify(token)
        if(user){
            return next(root,args,context,info)
        }else {
            throw new AuthenticationError("please login ")
        }
    }else {
        throw new AuthenticationError("please login ")
    }    
}
module.exports = {
    authentication
}
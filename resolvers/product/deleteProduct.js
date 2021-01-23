const {Product} = require("../../models")
const { authentication } = require("../../helpers/authentication")
const { authorizationProduct } = require("../../helpers/authorizationProduct")


module.exports = authentication( authorizationProduct( async (_,args) =>{
    try {
        const productId = args.id
        const deletedProduct = await Product.destroy({
            where : {
                id : productId
            }
        })
        let message = null
        deletedProduct ? message = {msg : "succes delete product"} : message = {msg: "data not found"}
        console.log(deletedProduct)
        return message
    } catch (error) {
        
    }
}))
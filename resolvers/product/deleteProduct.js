const {Product} = require("../../models")
module.exports = async (_,args) =>{
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
}
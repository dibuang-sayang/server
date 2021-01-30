const { Product } = require("../../models")

module.exports = async(_,args) => {
    try {
        const productId  = args.id
        const productData = await Product.findOne({
            where: {
                id: productId
            },
            include : ["Office"]
        }) 
        return productData
    } catch (error) {
        return error
    }
}
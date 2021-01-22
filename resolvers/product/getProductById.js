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
        console.log(productData);
        return productData
    } catch (error) {
        console.log(error);
    }
}
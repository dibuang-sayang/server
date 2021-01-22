const { Product } = require("../../models")

module.exports = async () => {
    try {
        const productData = await Product.findAll({
            include : ["Office"]
        })
        console.log(productData);
        return productData
    } catch (error) {
        console.log(error);
    }
}
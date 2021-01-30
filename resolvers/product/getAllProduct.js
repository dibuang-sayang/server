const { Product } = require("../../models")

module.exports = async () => {
    try {
        const productData = await Product.findAll({
            include : ["Office"]
        })
        return productData
    } catch (error) {
        return error
    }
}
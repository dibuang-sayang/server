const { Product } = require("../../models")

module.exports = async (_,args) => {
    try {
        const {
            OfficeId,
            name,
            price,
            category,
            stock,
            picture
        } = args.data
        const newProduct = {
            OfficeId,
            name,
            price,
            category,
            stock,
            picture
        }
        const productCreated = await Product.create(newProduct)
        console.log(productCreated);
        return productCreated
    } catch (error) {
        console.log(error);
    }
}
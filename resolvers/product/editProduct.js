const {Product} = require("../../models")

module.exports = async (_,args) => {
    try {
        const productId = args.id
        const {
            OfficeId,
            name,
            price,
            category,
            stock,
            picture
        } = args.data
        const newData = {
            OfficeId,
            name,
            price,
            category,
            stock,
            picture
        } 
        const editedProduct = await Product.update(newData, {
            where : {
                id : productId
            },
            returning : true

        })
        const data = editedProduct[1][0].dataValues
        console.log(data);
        return data
    } catch (error) {
        console.log(error);
    }
}
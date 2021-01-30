const {Product} = require("../../models")
const { authentication } = require("../../helpers/authentication")
const { authorizationProduct } = require("../../helpers/authorizationProduct")

module.exports = authentication( authorizationProduct( async (_,args) => {
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
        if(!editedProduct[0]) throw new Error("data not found")
        const data = editedProduct[1][0].dataValues
        return data
    } catch (error) {
        return error
    }
}))
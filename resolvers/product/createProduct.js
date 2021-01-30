const { Product, Office } = require("../../models")
const {authorizationUserRole} = require("../../helpers/authorizationUserRole");
const { authentication } = require("../../helpers/authentication");

module.exports = authentication( authorizationUserRole(["pengepul", "pengrajin"], async (_,args, {user}) => {
    try {
        // console.log(user);
        const officeData = await Office.findOne({
            where : {
                UserId : user.id
            }
        })
        if(!officeData) throw new Error("Belum punya kantor coy")
        const officeId = officeData.id
        const {
            name,
            price,
            category,
            stock,
            picture
        } = args.data
        const newProduct = {
            OfficeId :officeId,
            name,
            price,
            category,
            stock,
            picture
        }
        const productCreated = await Product.create(newProduct)
        return productCreated
    } catch (error) {
        return error
    }
}))
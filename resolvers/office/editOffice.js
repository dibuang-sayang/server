const { Office } = require("../../models")
const {authentication } = require("../../helpers/authentication")
const { authorizationIdUser } = require("../../helpers/authorizationIdUser")
module.exports = authentication( authorizationIdUser( async (_,args) => {
    try {
        const officeId = args.id
        const {
            UserId,
            address,
            latitude,
            longitude ,
            phoneNumber ,
            category 
        } = args.data
        const newData = {
            UserId,
            address,
            latitude,
            longitude ,
            phoneNumber ,
            category 
        }
        const editedOffice = await Office.update(newData, {
            where : {
                id : officeId
            },
            returning : true
        })
        const data = editedOffice[1][0].dataValues
        return data
    } catch (error) {
        
    }
}))
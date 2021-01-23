const { Office } = require("../../models")
const { authentication } = require("../../helpers/authentication")
const { authorizationIdOfficeUser } = require("../../helpers/authorizationIdOfficeUser")
module.exports = authentication( authorizationIdOfficeUser( async (_,args) => {
    try {
        const officeId = args.id
        const deletedOffice = await Office.destroy({
            where : {
                id : officeId
            },
        })
        let message = null
        deletedOffice ? message = {msg : "success delete office data"} : message = {msg : "data not found"}
        return message
    } catch (error) {
        console.log(error)
    }
}))
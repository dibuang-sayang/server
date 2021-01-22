const { Office } = require("../../models")

module.exports = async (_,args) => {
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
}
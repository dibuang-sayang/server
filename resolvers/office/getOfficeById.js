const { Office } = require("../../models")

module.exports = async (_,args) => {
    console.log(args)
    try {
        const officeId = args.id
        const officeData = Office.findOne({
            where : {
                id : officeId
            }
        })
        console.log(officeData)
        return officeData
    } catch (error) {
        console.log(error)
    }
}
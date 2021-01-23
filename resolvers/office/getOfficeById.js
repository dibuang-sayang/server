const { Office } = require("../../models")

module.exports = async (_,args,{userLogin}) => {
    console.log(args)
    try {
        const user = await userLogin
        console.log(user, "<<<< User")
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
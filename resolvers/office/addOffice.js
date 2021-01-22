const { Office } = require("../../models")


module.exports = async(_,args) => {
    try {
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
        console.log(newData)
        const newOffice = await Office.create(newData)
        console.log(newOffice)
        return newOffice
    } catch (error) {
        console.log(error)
    }
}
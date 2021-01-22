const { Office } = require("../../models")

module.exports = async() => {
    try {
        const officeData = await Office.findAll({
            include : ["User"]
        })
        console.log(officeData)
        return officeData
    } catch (error) {
        console.log(error)
    }
}
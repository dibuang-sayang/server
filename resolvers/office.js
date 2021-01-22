const {
    addOffice,
    getAllOffice,
    getOfficeById,
    editOffice,
    deleteOffice
} = require("./office/index")

module.exports = {
    Query : {
        offices : getAllOffice,
        office : getOfficeById
    },
    Mutation : {
        addOffice : addOffice,
        editOffice : editOffice,
        deleteOffice : deleteOffice
    }
}
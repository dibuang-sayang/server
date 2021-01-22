const {
    addOffice,
    getAllOffice
} = require("./office/index")

module.exports = {
    Query : {
        offices : getAllOffice
    },
    Mutation : {
        addOffice : addOffice
    }
}
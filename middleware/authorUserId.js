const {User} = require("../models")

async function checkUserId(IdUserLogin, idUserEdited) {
    return Number(idUserEdited) === IdUserLogin ? true :false
}

module.exports = {
    checkUserId
}
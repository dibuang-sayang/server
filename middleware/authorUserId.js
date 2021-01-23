const {User} = require("../models")

async function checkUserId(IdUserLogin, idUserEdited) {
    // console.log(+idUserEdited, IdUserLogin, "<<<< dari author")
    return Number(idUserEdited) === IdUserLogin ? true :false
}

module.exports = {
    checkUserId
}
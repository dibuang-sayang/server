const { User } = require("../../models")

module.exports = async(_,args) => {
    try {
        const userId = args.id
        const userData = User.findOne({
            where : {
                id :userId
            }
        })
        return userData
    } catch (error) {
        console.log(error)
    }
}
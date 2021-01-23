const { User } = require("../../models")
const {authentication } = require("../../helpers/authentication")

module.exports = authentication( async (_,args) => {
    try {
        const userId = args.id
        const {
            firstName,
            lastName,
            password,
            role,
            email
        } = args.data


        const newUserData = {
            firstName,
            lastName,
            password,
            role,
            email
        }
        const updatedData = await User.update(newUserData,{
            where : {
                id : userId
            },
            returning : true
        })
        const data = updatedData[1][0].dataValues
        return data 
    } catch (error) {
        return error
    }
})
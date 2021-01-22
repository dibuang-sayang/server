const { User } = require("../../models")

module.exports = async (_,args) => {
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
        console.log(newUserData, "data baru")
        const updatedData = await User.update(newUserData,{
            where : {
                id : userId
            },
            returning : true
        })
        const data = updatedData[1][0].dataValues
        return data 
    } catch (error) {
        console.log(error)
    }
}
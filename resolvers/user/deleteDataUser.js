const { User } = require('../../models')

module.exports = async (_,args) => {
    console.log(args.id)
    try {

        const userId  = args.id
        const deletedUser = await User.destroy({where: {id : userId}})
        console.log(deletedUser)
        let message = null
        deletedUser ?  message = {msg : "Succes delete Data"} : message =  {msg : "data not found"}
        return message
    } catch (error) {
        console.log(error)
    }
}
const { Cart } = require("../../models")
const { authentication } = require("../../helpers/authentication")
const { Op } = require("sequelize");

module.exports = authentication( async(_,args, {user}) =>{
    try {
        let {
            ProductId,
            quantity,
            status,
        } = args.data
        
        const newData = {
            UserId : user.id,
            ProductId,
            quantity,
            status
        }
        // check data user 
        const findCart = await  Cart.findOne({
            where : {
                [Op.and] : [
                    {ProductId},
                    {UserId : user.id} 
                ]
            },
            include : ["Product"]
            
        })
        if(!findCart) {
            const newCart = await Cart.create(newData)
            return newCart
        }else {
            const newQuantity = findCart.quantity +1
            const maxQuantity = findCart.Product.stock

            if (newQuantity > maxQuantity) throw new Error("terlalu banyak coy")
            const editData = {...newData} 
            editData.quantity = newQuantity
            const updateCart = await Cart.update(editData, {
                where : {
                    [Op.and] : [
                        {ProductId},
                        {UserId : user.id} 
                    ]
                },
                returning : true
            })
            return updateCart[1][0].dataValues
        }
        

    } catch (error) {
        return error;
    }
})
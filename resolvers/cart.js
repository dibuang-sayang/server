const {
    addCart,
    deleteCart,
    editCart,
    getAllCart,
    getCartById,
    checkOut
} = require("./cart/index")

module.exports = {
    Query : {
        carts : getAllCart,
        cart : getCartById,
        checkOut : checkOut
    },
    Mutation : {
        addCart : addCart,
        deleteCart : deleteCart,
        editCart : editCart
    }
}
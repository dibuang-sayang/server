const {
    createProduct,
    getAllProduct,
    getProductById,
    editProduct,
    deleteProduct
} = require("./product/index")

module.exports = {
    Query : {
        products : getAllProduct,
        product : getProductById
    }, 
    Mutation : {
        addProduct : createProduct,
        editProduct : editProduct,
        deleteProduct : deleteProduct
    }
}
const { Product } = require("../../models");
const { authentication } = require("../../helpers/authentication");
const { authorizationProduct } = require("../../helpers/authorizationProduct");

module.exports = authentication(
  authorizationProduct(async (_, args) => {
    try {
      const productId = args.id;
      const deletedProduct = await Product.destroy({
        where: {
          id: productId,
        },
      });
      let message = null;
      if (deletedProduct) {
        message = { msg: "succes delete product" };
      } else throw new Error("data not found");
      return message;
    } catch (error) {
      return error;
    }
  })
);

const { Product } = require('../../models');
const { authentication } = require('../../helpers/authentication');
const { authorizationProduct } = require('../../helpers/authorizationProduct');

module.exports = authentication(
  authorizationProduct(async (_, args) => {
    try {
      const productId = args.id;
      const deletedProduct = await Product.destroy({
        where: {
          id: productId,
        },
      });
      return { msg: 'succes delete product' };
    } catch (error) {
      return error;
    }
  })
);

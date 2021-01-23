//index resolvers
const userResolver = require("./user");
const officeResolver = require("./office")
const productResolver = require("./product")
const cartResolver = require("./cart")


module.exports = [userResolver, officeResolver,productResolver,cartResolver];

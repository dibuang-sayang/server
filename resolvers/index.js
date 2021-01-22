//index resolvers
const userResolver = require("./user");
const officeResolver = require("./office")
const productResolver = require("./product")


module.exports = [userResolver, officeResolver,productResolver];

//index typedef
const userTypeDef = require("./user");
const officeTypeDef = require("./office")
const productTypeDef = require("./product")
const cartTypeDef = require("./cart")
const Mutation = require("./mutation");
const Query = require("./query");

module.exports = [userTypeDef, Query, Mutation, officeTypeDef, productTypeDef, cartTypeDef];

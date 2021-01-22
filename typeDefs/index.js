//index typedef
const userTypeDef = require("./user");
const officeTypeDef = require("./office")
const productTypeDef = require("./product")
const Mutation = require("./mutation");
const Query = require("./query");

module.exports = [userTypeDef, Query, Mutation, officeTypeDef, productTypeDef];

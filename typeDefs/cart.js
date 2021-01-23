const { gql } = require("apollo-server")

module.exports = gql `
    type Cart {
        id : ID
        UserId : Int
        ProductId : Int
        quantity : Int
        status : String
    }

    input CartData {
        ProductId : Int
        quantity : Int
        status : String
    }
`
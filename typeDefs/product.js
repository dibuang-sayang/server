const { gql } = require("apollo-server")

module.exports = gql`
    type Product {
        id : ID
        OfficeId: Int
        name: String
        price : Int
        category : String
        stock : Int
        picture : String
        Office : Office
    }

    input ProductData {
        OfficeId: Int
        name: String
        price : Int
        category : String
        stock : Int
        picture : String
    }
`
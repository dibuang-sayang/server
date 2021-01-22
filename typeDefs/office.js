const { gql } = require("apollo-server")

module.exports = gql`
    
    type Office {
        id : ID
        UserId : Int
        address : String
        latitude : Float
        longitude : Float
        phoneNumber : String
        category : String
        User : [String]
    }

    input OfficeData {
        UserId : Int
        address : String
        latitude : Float
        longitude : Float
        phoneNumber : String
        category : String
    }
    
    type OfficeMessage {
        msg : String
    }
`
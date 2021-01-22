const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    password: String
    role: String
    email: String
  }

  input UserData {
    firstName: String
    lastName: String
    password: String
    role: String
    email: String
  }

  type Message {
    msg : String
  }
`;

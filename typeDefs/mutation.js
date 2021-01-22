const { gql } = require("apollo-server");

module.exports = gql`
  type Mutation {
    register(data: UserData): User
    deleteUser(id: ID!) : Message
    editUser(id: ID!, data : UserData) : User
  }
`;

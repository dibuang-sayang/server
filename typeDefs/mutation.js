const { gql } = require("apollo-server");

module.exports = gql`
  type Mutation {
    register(data: UserData): User
  }
`;

const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    users: [User]
    user: User

    offices: [Office]
    office: Office

    products: [Product]
    product(id: ID!): Product
  }
`;

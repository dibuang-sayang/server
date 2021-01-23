const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    users: [User]
    user: User

    offices: [Office]
    office(id: ID!): Office

    products: [Product]
    product(id: ID!): Product
  }
`;

const { gql } = require('apollo-server');

module.exports = gql`
  type Mutation {
    register(data: UserData): User
    deleteUser: Message
    editUser(data: UserData): User
    loginUser(email: String, password: String): Token

    addOffice(data: OfficeData): Office
    deleteOffice: OfficeMessage
    editOffice(data: OfficeData): Office

    addProduct(data: ProductData): Product
    deleteProduct(id: ID!): Message
    editProduct(id: ID!, data: ProductData): Product

    addCart(data: CartData): Cart
    deleteCart(id: ID!): Message
    editCart(id: ID!, data: CartData): Cart
  }
`;

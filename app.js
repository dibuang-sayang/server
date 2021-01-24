if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
// const { findUserFromToken } = require("./middleware/authentication")
const models = require("./models")
const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context({req}) {
    // const token = req.headers.token
    // const userLogin = findUserFromToken(token)
    return {req, models}
  }
});

module.exports = server;
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

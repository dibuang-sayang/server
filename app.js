const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

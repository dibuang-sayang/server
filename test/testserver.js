const { ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
require('dotenv').config();

const typeDefs = require('../typeDefs');
const resolvers = require('../resolvers');

const createTestServer = (ctx) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks: true,
    mockEntireSchema: false,
    context: () => ctx,
  });
  return createTestClient(server);
};

module.exports = createTestServer;

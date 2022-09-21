const { ApolloServer, gql } = require("apollo-server");
const { typeDefs } = require("./schema");
const { Query } = require("./resolvers/Query");
const { Tweet } = require("./resolvers/Tweet");
const { Mutation } = require("./resolvers/Mutation");
const { db } = require("./db");

exports.server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Tweet,
    Mutation
  },
  context: {
    db
  },
});
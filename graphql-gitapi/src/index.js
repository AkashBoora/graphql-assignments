const { ApolloServer } = require("apollo-server");
const { Query } = require("./resolvers/Query");
const { typeDefs } = require("./schema");
const {Mutation}  = require("./resolvers/Mutations")


const server = new ApolloServer({
  typeDefs,
  resolvers:{
    Query,
    Mutation
  },
  context: ({ req }) => {
    const ctx = {
      token: null,
    };
    try {
      if (req.headers["authorization"]) {
        ctx.token = req.headers["authorization"];
      }
    } catch (e) {}
    return ctx;
  }
});
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

const { ApolloServer, gql } = require("apollo-server");
const { typeDefs } = require("./schema");
const { Query } = require("./resolvers/Query");
const isTokenValid = require("./validate");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
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

server.listen().then(({url}) => {
    console.log("Server is ready at "+url);
})

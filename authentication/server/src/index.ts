import { ApolloServer, AuthenticationError, gql } from "apollo-server";
import jwt from "jsonwebtoken";
import guid from "guid";
import users from "./users";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const typeDefs = gql`
  type Query {
    todos: [String!]
    authenticate(name: String!, password: String!): String
  }

  type Mutation {
    authenticate(name: String!, password: String!): String
  }
`;

const resolvers = {
  Query: {
    todos: (parent: unknown, args: unknown, context: { name: string }) => {
      if (!users[context?.name]) {
        throw new AuthenticationError("Invalid Credentials");
      }
      return users[context?.name].todos;
    },
    authenticate: (
      parent: unknown,
      { name, password }: { name: string; password: string }
    ) => {
      if (users[name] && users[name].password === password) {
        return jwt.sign({ data: name }, JWT_SECRET, { expiresIn: "1h" });
      } else {
        throw new AuthenticationError("Invalid Credentials");
      }
    },
  },
  Mutation: {
    authenticate: (
      parent: unknown,
      { name, password }: { name: string; password: string }
    ) => {
      if (users[name] && users[name].password === password) {
        return jwt.sign({ data: name }, JWT_SECRET, { expiresIn: "1h" });
      } else {
        throw new AuthenticationError("Invalid Credentials");
      }
    },
  },
};

const server = new ApolloServer({
  cors:{
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  },
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const ctx: { name: string | null } = {
      name: null,
    };
    try {
      if (req.headers["authenticate"]) {
        const token = jwt. verify(
          req.headers["authenticate"] as string,
          JWT_SECRET
        ) as unknown as {
          data: string;
        };
        ctx.name = token.data;
      }
    } catch (e) {}
    return ctx;
  }
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  server ready at ${url}`);
});

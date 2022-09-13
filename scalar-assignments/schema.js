const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    hello: String!
    movies(filter: movieFilterInput): [Movie!]!
    movie(id: Int!): Movie!
  }
  type Movie{
    title: String!
    description: String!
    director: String!
    releaseYear: String!
    majorGenre: String!
    imdbRating: Float!
    imdbVotes: Int
  }
  input movieFilterInput{
    titleContains: String
    majorGenre: String
  }
`;

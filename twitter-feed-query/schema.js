const { gql } = require("apollo-server");

exports.typeDefs = gql`
  scalar Date

  type Query {
    tweets(
      limit: Int
      skip: Int
      sort_field: String
      sort_order: String
    ): [Tweet]
    tweet(id: ID!): Tweet
    users: [User]
    user(id: ID!): User
    notifications(limit: Int): [Notification]
    notification(id: ID!): Notification
    stats: [Stat]
    stat(id: ID!): Stat
    tweetsMeta: Meta
    notificationsMeta: Meta
  }

  type Mutation {
    createTweet(body: String!): Tweet
    deleteTweet(id: ID!): Tweet
    markTweetRead(id: ID!): Boolean
  }

  type Tweet {
    id: ID!
    body: String
    date: Date
    author: User
    stats: Stat
    read: Boolean!
  }

  type User {
    id: ID!
    username: String
    first_name: String
    last_name: String
    full_name: String
    name: String @deprecated
    avatar_url: String
  }

  type Stat {
    id: ID!
    views: Int
    likes: Int
    retweets: Int
    responses: Int
  }

  type Notification {
    id: ID!
    date: Date
    body: String
  }

  type Meta {
    count: Int
  }
`;

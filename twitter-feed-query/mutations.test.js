const { ApolloServer, gql } = require("apollo-server");
const { typeDefs } = require("./schema");
const { Query } = require("./resolvers/Query");
const { Tweet } = require("./resolvers/Tweet");
const { Mutation } = require("./resolvers/Mutation");
const { db } = require("./db");
const { GET_TWEET, GET_TWEETS } = require("./resolver.test");

let server;

const CREATE_TWEET = gql`
  mutation ($body: String!) {
    createTweet(body: $body) {
      body
    }
  }
`;

const DELETE_TWEET = gql`
  mutation ($deleteTweetId: ID!) {
    deleteTweet(id: $deleteTweetId) {
      body
    }
  }
`;

const MARK_TWEET = gql`
  mutation ($markTweetReadId: ID!) {
    markTweetRead(id: $markTweetReadId)
  }
`;

describe("testing tweets queries", () => {
  beforeAll(() => {
    server = new ApolloServer({
      typeDefs,
      resolvers: {
        Query,
        Tweet,
        Mutation,
      },
      context: {
        db,
      },
    });
  });
  test("testing createTweet", async () => {
    let result = await server.executeOperation({
      query: CREATE_TWEET,
      variables: {
        body: "Hello, how are you!",
      },
    });
    expect(result.data.createTweet.body).toEqual("Hello, how are you!");
    result = await server.executeOperation({
      query: gql`
        query {
          tweets {
            id
          }
        }
      `,
    });
    expect(result.data.tweets).toHaveLength(4);
  });

  test("testing deleteTweet", async () => {
    let result = await server.executeOperation({
      query: DELETE_TWEET,
      variables: {
        deleteTweetId: "tweet4",
      },
    });
    result = await server.executeOperation({
      query: gql`
        query {
          tweets {
            id
          }
        }
      `,
    });
    expect(result.data.tweets).toHaveLength(3);
  });

  test("testing markReadTweet", async () => {
    let value;
    let result = await server.executeOperation({
      query: gql`
        query ($tweetId: ID!) {
          tweet(id: $tweetId) {
            id
            read
          }
        }
      `,
      variables: {
        tweetId: "tweet1",
      },
    });
    value = result.data.tweet.read;

    result = await server.executeOperation({
      query: MARK_TWEET,
      variables: {
        markTweetReadId: "tweet1",
      },
    });
    result = await server.executeOperation({
      query: gql`
        query ($tweetId: ID!) {
          tweet(id: $tweetId) {
            id
            read
          }
        }
      `,
      variables: {
        tweetId: "tweet1",
      },
    });
    expect(result.data.tweet.read).toEqual(!value);
  });
});

const { ApolloServer, gql } = require("apollo-server");
const { typeDefs } = require("../schema");
const { Query } = require("../resolvers/Query");
const { Tweet } = require("../resolvers/Tweet");
const { Mutation } = require("../resolvers/Mutation");
const { db } = require("../db");

let server;

const GET_TWEET = gql`
  query ($tweetId: ID!) {
    tweet(id: $tweetId) {
      id
      body
      date
      read
      author {
        name
        username
        avatar_url
      }
      stats {
        likes
        responses
        retweets
        views
      }
    }
  }
`;

const GET_TWEETS = gql`
  query ($limit: Int, $skip: Int) {
    tweets(limit: $limit, skip: $skip) {
      id
      body
      date
      author {
        name
        username
        avatar_url
      }
    }
  }
`;

const GET_USERS = gql`
  query {
    users {
      id
      username
      first_name
      last_name
      full_name
      name
      avatar_url
    }
  }
`;

const GET_USER = gql`
  query ($userId: ID!) {
    user(id: $userId) {
      id
      username
      first_name
      last_name
      full_name
      name
      avatar_url
    }
  }
`;

const GET_NOTIFICATIONS = gql`
  query {
    notifications {
      body
    }
  }
`;
const GET_NOTIFICATION = gql`
  query ($notificationId: ID!) {
    notification(id: $notificationId) {
      body
    }
  }
`;

const GET_STATS = gql`
  query {
    stats {
      id
    }
  }
`;

const GET_STAT = gql`
  query ($statId: ID!) {
    stat(id: $statId) {
      id
      views
      likes
      responses
      retweets
    }
  }
`;

const GET_TWEETSMETA = gql`
query{
  tweetsMeta {
    count
  }
}`

const GET_NOTIFICATIONSMETA = gql`
query{
notificationsMeta {
  count
}
}`

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
  test("testing tweets", async () => {
    let result = await server.executeOperation({
      query: GET_TWEETS,
      variables: {
        limit: 2,
        skip: 1,
      },
    });
    expect(result).toBeTruthy();
    expect(result).toHaveProperty("data");
    expect(result.data.tweets).toHaveLength(2);
  });
  test("testing tweets without variables", async () => {
    let result = await server.executeOperation({
      query: GET_TWEETS,
    });
    expect(result).toBeTruthy();
    expect(result).toHaveProperty("data");
    expect(result.data.tweets).toHaveLength(3);
  });
  test("testing tweet", async () => {
    let result = await server.executeOperation({
      query: GET_TWEET,
      variables: {
        tweetId: "tweet1",
      },
    });
    expect(result).toBeTruthy();
    expect(result.data.tweet.id).toBeTruthy();
    expect(result.data.tweet.body).toBeTruthy();
    expect(result.data.tweet.date).toBeTruthy();
    expect(result.data.tweet.author).toBeTruthy();
    expect(result.data.tweet.stats).toBeTruthy();
    expect(result.data.tweet).toHaveProperty("read");
  });
});
describe("testing user quries", () => {
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
  test("testing user", async () => {
    result = await server.executeOperation({
      query: GET_USERS,
    });
    expect(result).toBeTruthy();
    expect(result).toHaveProperty("data");
    expect(result.data.users).toHaveLength(3);
  });
  test("testing user with wrong variable", async () => {
    result = await server.executeOperation({
      query: GET_USER,
      variables: {
        userId: "hello",
      },
    });
    expect(result).toBeTruthy();
    expect(result?.data.user).toBeFalsy();
  });
  test("testing user positive testing", async () => {
    result = await server.executeOperation({
      query: GET_USER,
      variables: {
        userId: "user1",
      },
    });
    expect(result).toBeTruthy();
    expect(result?.data.user.id).toBeTruthy();
    expect(result?.data.user.username).toBeTruthy();
    expect(result?.data.user.first_name).toBeTruthy();
    expect(result?.data.user.last_name).toBeTruthy();
    expect(result?.data.user.full_name).toBeTruthy();
    expect(result?.data.user.avatar_url).toBeTruthy();
  });
});

describe("testing quries", () => {
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
  test("testing notifications", async () => {
    let result = await server.executeOperation({
      query: GET_NOTIFICATIONS,
    });
    expect(result.data.notifications).toHaveLength(3);
  });

  test("testing notification", async () => {
    let result = await server.executeOperation({
      query: GET_NOTIFICATION,
      variables: {
        notificationId: "notification1",
      },
    });
    expect(result.data.notification.body).toBeTruthy();
  });
  test("testing notification negative  case", async () => {
    let result = await server.executeOperation({
      query: GET_NOTIFICATION,
      variables: {
        notificationId: "notificaton1",
      },
    });
    expect(result.data.notification).toBeFalsy();
  });

  test("testing stats", async () => {
    let result = await server.executeOperation({
      query: GET_STATS,
    });
    expect(result.data.stats).toHaveLength(3);
  });

  test("testing stat", async () => {
    let result = await server.executeOperation({
      query: GET_STAT,
      variables: {
        statId: "stat1",
      },
    });
    expect(result.data.stat.id).toBeTruthy();
    expect(result.data.stat.responses).toBeTruthy();
    expect(result.data.stat.views).toBeTruthy();
    expect(result.data.stat.retweets).toBeTruthy();
    expect(result.data.stat.likes).toBeTruthy();
  });

  test("testing stat negitive case", async () => {
    let result = await server.executeOperation({
      query: GET_STAT,
      variables: {
        statId: "stat",
      },
    });
    expect(result.data.stat).toBeFalsy();
  });

  test("testing meta",async()=>{
    let result = await server.executeOperation({
      query: GET_TWEETSMETA,
    });
    expect(result.data.tweetsMeta.count).toEqual(3);
  });
});

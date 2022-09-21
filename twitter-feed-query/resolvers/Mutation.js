const { tweets } = require("../db");

exports.Mutation = {
  createTweet: (parent, { body }, { db }) => {
    const id = db.tweets.length + 1;
    const newStat = {
      id: "stat" + id,
      views: 0,
      likes: 0,
      retweets: 0,
      responses: 0,
    };
    const newTweet = {
      id: "tweet" + id,
      body,
      date: new Date().toISOString().split("T")[0],
      authorId: "user1",
      statsId: "stat" + id,
      read: false,
    };
    db.tweets.push(newTweet);
    db.stats.push(newStat);
    return newTweet;
  },
  deleteTweet: (parent, { id }, { db }) => {
    const deletedTweet = db.tweets.find((tweet) => {
      if (tweet.id === id) {
        tweet.authorId = null;
        tweet.statsId = null;
        return true;
      }
    });
    const idInt = id.slice(5);
    db.tweets = db.tweets.filter((tweet) => tweet.id !== id);
    db.stats = db.stats.filter((stat) => stat.id !== "stat" + idInt);
    return deletedTweet;
  },
  markTweetRead: (parent, { id }, { db }) => {
    const index = db.tweets.findIndex((tweet) => {
      return tweet.id === id;
    });
    const val = !db.tweets[index].read;
    db.tweets[index] = {
      ...db.tweets[index],
      read: val,
    };
    if (index !== -1) {
      return true;
    }
    return false;
  }
};

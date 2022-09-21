exports.Query = {
  tweets: (parent, { limit, skip, sort_field, sort_order }, { db }) => {
    let filteredTweets = db.tweets;
    if (skip) {
      filteredTweets = filteredTweets.filter(
        (tweet, key) => !(key + 1 === skip)
      );
    }
    if (limit > 0) {
      filteredTweets = filteredTweets.filter((tweet, key) => key < limit);
    }
    if (sort_order) {
      if (sort_order.toLowerCase() === "asc") {
        filteredTweets = filteredTweets.sort((a, b) =>
          a[sort_field].toLowerCase() > b[sort_field].toLowerCase() ? 1 : -1
        );
      } else if (sort_order.toLowerCase() === "desc") {
        filteredTweets = filteredTweets.sort((a, b) =>
          a[sort_field].toLowerCase() < b[sort_field].toLowerCase() ? 1 : -1
        );
      }
    }
    return filteredTweets;
  },
  tweet: (parent, { id }, { db }) => {
    return db.tweets.find((tweet) => tweet.id === id);
  },
  users: (parent, args, { db }) => {
    return db.users;
  },
  user: (parent, { id }, { db }) => {
    return db.users.find((user) => user.id === id);
  },
  notifications: (parent, { limit }, { db }) => {
    let filteredNotifications = db.notifications;
    if (limit > 0) {
      filteredNotifications = filteredNotifications.filter(
        (notification, key) => key < limit
      );
    }
    return filteredNotifications;
  },
  notification: (parent, { id }, { db }) => {
    return db.notifications.find((notification) => notification.id === id);
  },
  stats: (parent, args, {db}) =>{
    return db.stats;
  },
  stat: (parent, { id }, { db }) => {
    return db.stats.find((stat) => stat.id === id);
  },
  tweetsMeta: (parent, args, { db }) => {
    const size = db.tweets.length;
    const Meta = {
        count: size
    }
    return Meta;
  },
  notificationsMeta: (parent, args, { db }) => {
    const size = db.length;
    const Meta = {
        count: size
    }
    return Meta;
  }
};

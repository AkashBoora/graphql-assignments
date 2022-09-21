exports.Tweet = {
  author: ({ authorId }, args, { db }) => {
    return db.users.find((user) => user.id === authorId);
  },
  stats:({ statsId }, args, { db }) => {
    return db.stats.find((stat) => stat.id === statsId);
  },
};

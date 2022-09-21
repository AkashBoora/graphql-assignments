const tweets = [
  {
    id: "tweet1",
    body: "It's a new day in America.",
    date: "2021-01-21",
    authorId: "user1",
    statsId: "stat1",
    read: false
  },
  {
    id: "tweet2",
    body: "I hope that even my worst critics remain on Twitter, because that is what free speech means.",
    date: "2022-04-25",
    authorId: "user2",
    statsId: "stat2",
    read: false
  },
  {
    id: "tweet3",
    body: "Hey guys, wanna feel old? I'm 40.You're welcome.",
    date: "2020-08-26",
    authorId: "user3",
    statsId: "stat3",
    read: false
  },
];

const users = [
  {
    id: "user1",
    username: "JoeBiden",
    first_name: "Joe",
    last_name: "Biden",
    full_name: "Joe Biden",
    name: "Joe Biden",
    avatar_url:
      "https://toppng.com//public/uploads/preview/biden-circle-joe-bide-11562970372sjmizmx2qp.png",
  },
  {
    id: "user2",
    username: "elonmusk",
    first_name: "Elon",
    last_name: "Musk",
    full_name: "Elon Musk",
    name: "Elon Musk",
    avatar_url:
      "https://pyxis.nymag.com/v1/imgs/15a/a77/b92f3a2d6de4ac79f869b4ab5300da4c8c-elon-musk.rsquare.w700.jpg",
  },

  {
    id: "user3",
    username: "IncredibleCulk",
    first_name: "Macaulay",
    last_name: "Culkin",
    full_name: "Macaulay Culkin",
    name: "Macaulay Culkin",
    avatar_url:
      "https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/08/08/15/gettyimages-1048469244.jpg?quality=75&width=1200&auto=webp",
  },
];

const stats = [
  {
    id: "stat1",
    views: 234300,
    likes: 6759,
    retweets: 789,
    responses: 798,
  },
  {
    id: "stat2",
    views: 2368700,
    likes: 6784,
    retweets: 2567,
    responses: 873,
  },
  {
    id: "stat3",
    views: 435667,
    likes: 3478,
    retweets: 1243,
    responses: 982,
  },
];
const notifications = [
  {
    id: "notification1",
    body: "Maya commented on your tweet",
    date: "2022-08-25"
  },
  {
    id: "notification2",
    body: "Your tweet is reaching places",
    date: "2022-08-31"
  },
  {
    id: "notification3",
    body: "Publish your tweet globally",
    date: "2022-08-28"
  },
];

exports.db = {
    tweets,
    users,
    notifications,
    stats
}
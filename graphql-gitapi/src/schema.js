const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    getUserInfo: User
    getUsers: [User]
    getAUser(username:String!):User
  }

  type Mutation {
    updateBio(bio:String): String
  }
  type User {
    login: String
    id: Int
    node_id: String
    avatar_url: String
    gravatar_id: String
    url: String
    html_url: String
    followers_url: String
    following_url: String
    gists_url: String
    starred_url: String
    subscriptions_url: String
    organizations_url: String
    repos_url: String
    events_url: String
    received_events_url: String
    type: String
    name: String
    company: String
    blog: String
    location: String
    email: String
    hireable: String
    bio: String
    twitter_username: String
    public_repos: Int
    public_gists: Int
    followers: Int
    following: Int
    site_admin: Boolean
    created_at: String
    updated_at: String
    private_gists: Int
    total_private_repos: Int
    owned_private_repos: Int
    disk_usage: Int
    collaborators: Int
  }
`;

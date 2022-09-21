const  axios = require("axios");
const { Octokit } = require("@octokit/core");
const { AuthenticationError } = require("apollo-server");

exports.Query = {
  getUserInfo: async (paren, args, { token }) => {
    const octokit = new Octokit({
      auth: token,
    });
    const response = await octokit.request("GET /user", {});
    if (response.data) return response.data;
    else throw new AuthenticationError(response.error)
  },
  getUsers: async (parent, args, { token }) => {
    const octokit = new Octokit({
      auth: token,
    });
    const response = await octokit.request("GET /users", {});
    if (response.data) return response.data;
    else throw new AuthenticationError(response.error)
  },
  getAUser: async (parent, { username }, { token }) => {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    if (response.data) return response.data;
    else throw new AuthenticationError(response.error)
  },
};

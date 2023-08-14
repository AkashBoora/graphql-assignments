const { Octokit } = require("@octokit/core");

exports.Mutation = {
  updateBio: async (parent, {bio}, { token }) => {
    const octokit = new Octokit({
      auth: token,
    });
    const request = await octokit.request("PATCH /user", {bio: bio});
    if (request.status === 200) return "Succesfully Changed";
    return "Error";
  },
};

import { gql, useQuery } from "@apollo/client";

const GET_TWEETS = gql`
  query {
    tweets {
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

export const useTweets = () => {
    const {error, loading, data} = useQuery(GET_TWEETS);
    return {
        error,
        loading,
        data
    }
};

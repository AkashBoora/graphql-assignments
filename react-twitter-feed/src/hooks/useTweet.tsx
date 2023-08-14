import { gql, useQuery } from "@apollo/client";

const GET_TWEET = gql`
  query ($tweetId: ID!) {
    tweet(id: $tweetId) {
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

export const useTweet = (tweetId: string) => {

  const { error, loading, data } = useQuery(GET_TWEET, {
    variables: {
      tweetId,
    },
  });
  return {
    error,
    loading,
    data,
  };
};

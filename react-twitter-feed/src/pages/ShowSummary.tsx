import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import "./Feed.css";
import { useTweet } from "../hooks/useTweet";
import { Link, useLocation } from "react-router-dom";
import Logo from "./../images/logo.png";
import Views from "./../images/view.png";
import Likes from "./../images/like.png";
import Delete from "./../images/delete-127.png";
import Retweets from "./../images/retweet.png";
import Responses from "./../images/responses.png";
import { Box } from "@mui/system";
import { gql, useMutation } from "@apollo/client";

const DELETE_TWEET = gql`
  mutation ($tweetId: ID!) {
    deleteTweet(id: $tweetId) {
      body
    }
  }
`;

const READ_TWEET = gql`
  mutation ($tweetId: ID!) {
    markTweetRead(id: $tweetId)
  }
`;

export const ShowSummary = () => {
  const tweetId = useLocation().pathname.slice(9);
  const { error, loading, data } = useTweet(tweetId);
  const [deleteTweet] = useMutation(DELETE_TWEET, {
    variables: {
      tweetId,
    },
  });
  const [readTweet] = useMutation(READ_TWEET, {
    variables: {
      tweetId,
    },
  });
  return (
    <div style={{ width: "98vw" }}>
      {error && (
        <Typography fontFamily={"Roboto"}>Something Went Wrong!!</Typography>
      )}
      {loading && <Typography fontFamily={"Roboto"}>Loading.....</Typography>}
      {data && (
        <div
          style={{
            height: "98vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            direction="column"
            className="main-container"
            width={"40%"}
            minWidth={"850px"}
            padding="15px"
          >
            <Grid
              item
              display={"flex"}
              alignItems="center"
              gap={"5px"}
              justifyContent="space-between"
            >
              <Box display={"flex"} alignItems="center">
                <Link to="/">
                  <img src={Logo} width={"50px"} height={"50px"} alt="logo" />
                </Link>
                <Typography>Tweet Summary</Typography>
              </Box>
              <Box>
                <button
                  onClick={async () => {
                    await readTweet();

                    await window.location.reload();
                  }}
                >
                  {data.tweet.read ? "Mark as Unread" : "Mark as Read"}
                </button>
                <Button
                  style={{ padding: "0px" }}
                  onClick={async () => {
                    await deleteTweet();
                    await window.open("http://localhost:3000/",'_self');
                  }}
                  startIcon={
                    <img
                      src={Delete}
                      width={"30px"}
                      height={"30px"}
                      alt="delete"
                    />
                  }
                ></Button>
              </Box>
            </Grid>
            <Grid item padding={"15px"}>
              <Typography>User: {data.tweet.author.name}</Typography>
              <Typography>UserName: @{data.tweet.author.username}</Typography>
              <Typography>Tweet: {data.tweet.body}</Typography>
            </Grid>
            <Grid item paddingLeft="30px">
              <Grid container direction={"column"} gap="10px">
                <Grid item display="flex" alignItems={"center"} gap="5px">
                  <img src={Views} width={"25px"} alt={"views"}></img>
                  <Typography>views: {data.tweet.stats.views}</Typography>
                </Grid>
                <Grid item display="flex" alignItems={"center"} gap="5px">
                  <img src={Likes} width={"25px"} alt={"likes"}></img>
                  <Typography>likes: {data.tweet.stats.likes}</Typography>
                </Grid>
                <Grid item display="flex" alignItems={"center"} gap="5px">
                  <img src={Retweets} width={"25px"} alt={"retweets"}></img>
                  <Typography>retweets: {data.tweet.stats.retweets}</Typography>
                </Grid>
                <Grid item display="flex" alignItems={"center"} gap="5px">
                  <img src={Responses} width={"25px"} alt={"reponses"}></img>
                  <Typography>
                    reponses: {data.tweet.stats.responses}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

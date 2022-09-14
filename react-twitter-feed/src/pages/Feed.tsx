import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useTweets } from "../hooks/useTweets";
import Twitl from "../images/twitl.png";
import Logo from "../images/tweetlogo.jpeg";
import Verify from "../images/verify.png";
import Summery from "../images/summary.png";
import "./Feed.css";
import moment from "moment";
import { NewTweetInput } from "./NewTweetInput";
import { Link } from "react-router-dom";

export interface Tweet {
  id: string;
  body: string;
  date: string;
  author?: User;
  stats?: Stat;
  read: Boolean;
}

export interface User {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  name?: string;
  avatar_url?: string;
}

export interface Stat {
  id: string;
  views: Number;
  likes: Number;
  retweets: Number;
  responses: Number;
}

export const Feed = () => {
  const { error, loading, data } = useTweets();
  const formatDate = (date: string) => {
    return moment(date, "YYYY-MM-DD").format("ll");
  };
  return (
    <div style={{ width: "100vw" }}>
      {error && (
        <Typography fontFamily={"Roboto"}>Something Went Wrong!!</Typography>
      )}
      {loading && <Typography fontFamily={"Roboto"}>Loading.....</Typography>}
      {data && (
        <div
          style={{
            height: "100vh",
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
          >
            <Grid item borderBottom={"1px solid #D3D3D3"} padding={"1rem"}>
              <Box className="top-container">
                <h3 style={{ fontFamily: "Roboto", margin: "0px" }}>Tweets</h3>
                <Button
                  style={{
                    textTransform: "none",
                    color: "black",
                    backgroundColor: "#efefef",
                    fontWeight: "600",
                    height: "30px",
                    borderColor: "#888888",
                    border: "1px solid",
                  }}
                  startIcon={
                    <img
                      src={Twitl}
                      alt="verifyimage"
                      height={"20px"}
                      width={"20px"}
                    />
                  }
                >
                  Follow @twitterapi
                </Button>
              </Box>
            </Grid>
            {data.tweets.map((tweet: Tweet) => (
              <Grid
                width={"100%"}
                item
                key={tweet.id}
                borderBottom={"1px solid #D3D3D3"}
                padding={"1rem"}
              >
                <Grid container gap={"1rem"}>
                  <Grid item md={1}>
                    <img
                      src={tweet.author?.avatar_url}
                      width={"60px"}
                      height={"60px"}
                      alt={"tweetlogo"}
                      style={{borderRadius:"50%"}}
                    />
                  </Grid>
                  <Grid item md={10.6}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Box display={"flex"} gap="0.2rem" alignItems={"center"}>
                        <Typography fontWeight={700}>
                          {tweet.author?.name}
                        </Typography>
                        <img
                          src={Verify}
                          height={"20px"}
                          width={"20px"}
                          alt={"verify"}
                        />
                        <Typography color={"#888888"}>
                          @{tweet.author?.username}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography color={"#888888"}>
                          {formatDate(tweet.date)}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography>{tweet.body}</Typography>
                    <Link
                      to={`/summary/${tweet.id}`}
                      style={{
                        textDecoration: "none",
                        color: "#03314B",
                        fontFamily: "Cera Pro",
                        fontWeight: "500",
                        fontSize: "16px",
                      }}
                    >
                      <Box display={"flex"} alignItems={"center"}>
                        <img src={Summery} width="20px" alt="summary pic" />
                        <Typography color={"#888888"}>Show Summary</Typography>
                      </Box>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid item>
              <NewTweetInput />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

import { gql, useMutation } from "@apollo/client";
import { InputBase } from "@mui/material";
import { useState } from "react";

const CREATE_TWEET = gql`
  mutation CreateMutation($body: String!) {
    createTweet(body: $body) {
      id
      body
      date
    }
  }
`;

export const NewTweetInput = () => {
  const [body, setBody] = useState<String>();

  const [createTweet] = useMutation(CREATE_TWEET, {
    variables: {
      body,
    },
  });

  return (
    <div
      style={{
        backgroundColor: "lightgray",
        width: "100%",
        display: "flex",
        borderRadius: "0 0 10px 10px",
      }}
    >
      <InputBase
        placeholder={"Tweet to @twitterapi"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createTweet();
            window.location.reload();
          }
        }}
        onChange={(e) => {
          setBody(e.target.value);
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
          margin: "7px 15px",
          width: "98.3%",
          border: "1px solid black",
          borderRadius:"5px",
          paddingLeft: "10px",
        }}
      />
    </div>
  );
};

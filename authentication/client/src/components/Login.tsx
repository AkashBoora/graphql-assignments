import { gql, useLazyQuery } from "@apollo/client";
import { Button, Grid, Input, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const GET_LOGIN = gql`
  query ($name: String!, $password: String!) {
    authenticate(name: $name, password: $password)
  }
`;

interface Props {
  setToken: (arg: string) => void;
}

export default function Login(props: Props) {
  const [name, setName] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const [getlogin, { error, data }] = useLazyQuery(GET_LOGIN, {
    variables: { name, password },
  });

  useEffect(()=>{
    if(data)
    {
      const token = data.authenticate;
      localStorage.setItem("token",token);
      props.setToken(token);
    }
  },[data]);
  return (
    <div>
      <Grid container direction={"column"} gap={"20px"}>
        {error ? <Typography color="error">Invalid Credentials</Typography> : <Typography >Please Login</Typography>}
        <Grid container gap={"10px"}>
          <Input
            color="success"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="username"
          ></Input>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          ></Input>
          <Button variant="contained" onClick={()=>getlogin()}>
            LogIn
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

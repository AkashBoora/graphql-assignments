import { gql, useLazyQuery } from "@apollo/client";
import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Login from "./Login";

const GET_TODOS = gql`
  query {
    todos
  }
`;

interface Props {
  setToken: (arg: string) => void;
  client:any
}

export default function Todos(props: Props) {
  const [todos, setTodos] = useState<String[]>([]);
  const [showTodos, setShowTodos] = useState(false);
  const [getTodo, { error, loading, data }] = useLazyQuery(GET_TODOS);
  async function handleShowTodos() {
    await getTodo().then(data=>setTodos(data.data.todos)).then(()=>setShowTodos((prevState: boolean) => !prevState));
  }
  function logout() {
    setTodos([]);
    props.setToken("");
    localStorage.removeItem("token");
    props.client.resetStore();
  }
  if(loading){
    return <Typography>Loading</Typography>
  }
  if(error?.graphQLErrors[0].extensions.code){
    return <Login setToken={props.setToken}/>
  }
  return (
    <div>
    <Grid container direction={"column"} gap="10px">
      <Button variant="contained" onClick={() => logout()}>
        LogOut
      </Button>
      <Button variant="contained" onClick={() => handleShowTodos()}>
        {showTodos ? "Hide Todos" : "Show Todos"}
      </Button>
      {showTodos && todos?.map((todo) => <Typography key={`${todo}`}>{todo}</Typography>)}
    </Grid>
    </div>
  );
}

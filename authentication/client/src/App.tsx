import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Todos from './components/Todos';
import useToken from './useToken';

interface Props{
  client: any
}

function App(props:Props) {
  const {token,setToken} = useToken()
  return (
    <div className="App">
      <header className="App-header">
        {!token && <Login setToken={setToken}/>}
        {token && <Todos client={props.client} setToken={setToken}/>}
      </header>
    </div>
  );
}

export default App;

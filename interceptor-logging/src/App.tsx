import React, { useState } from 'react';
import './App.css';
import axios from "axios"
import { useTweets } from './hooks/useTweets';

function App() {
  const { error, loading, data } = useTweets();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Interceptor Logger</h1>
        <div>
          {data && data.tweets.map((tweet:any)=>{
            return(
              <div key={tweet.id}>{tweet.body}</div>
            )
          })}
        </div>
      </header>
    </div>
  );
}

export default App;

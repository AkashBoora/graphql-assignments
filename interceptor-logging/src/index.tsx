import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloClient, ApolloLink, ApolloProvider, from, HttpLink, InMemoryCache, } from "@apollo/client";


const httpLink = new HttpLink({ uri: 'http://localhost:4000/' });

const request = new ApolloLink((operation, forward) => {
  console.log("request: ",operation);
  return forward(operation);
})

const response = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    if (response) {
      console.log(response);
    }
    return response;
  });
});

const client = new ApolloClient({
  link: from([
    request,
    response,
    httpLink
  ]),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);


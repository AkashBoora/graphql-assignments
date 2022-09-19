import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { ApolloClient, ApolloLink, ApolloProvider, from, HttpLink, InMemoryCache, } from "@apollo/client";

// axios.interceptors.request.use((request) => {
//   console.log("API call is requested");
//   console.log(request);
//   return request;
// });


// axios.interceptors.response.use((response) => {
//   if (response.status === 200) {
//     console.log("Response got from API");
//   }
//   console.log(response);
//   return response;
// });

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

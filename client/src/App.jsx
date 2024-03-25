import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./css/App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React from "react";
import Slides from "./components/Carousel";


const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const images = [
    
    "src/assets/images/Slide1.jpg",
    "src/assets/images/Slide2.jpg",
    "src/assets/images/Slide3.jpg",
    "src/assets/images/Slide4.jpg",
    "src/assets/images/Slide5.jpg",
    "src/assets/images/Slide6.jpg",
    "src/assets/images/Slide7.jpg",
    "src/assets/images/Slide8.jpg",
    "src/assets/images/Slide9.png",
    "src/assets/images/Slide10.jpg",
    
    
  ];

  return (
    <ApolloProvider client={client}>
      
      <Navbar />
      <Outlet />
      <Slides images={images} />
      <Footer />
    </ApolloProvider>
  );
}

export default App;

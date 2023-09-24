import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './newPages/Home';
import Profile from './newPages/Profile';
import Signup from './newPages/SignUp';
import Header from './newPages/Header';
import Footer from './newPages/Footer';
import Trip from './newPages/Trip';
import Create from './pages/Create';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/profile/:username"
                element={<Profile />}
              />
              <Route
                path="/profile/trip"
                element={<Trip />}
              />
              <Route
                path="/create"
                element={<Create />}
              />
              <Route
                path="profile/trip/:id" element={<Trip />} 
                />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

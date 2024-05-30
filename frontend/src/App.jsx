import React from 'react'; // Import the React library
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Import the Router, Route, and Switch components from React Router
import { ApolloProvider } from '@apollo/client'; // Import the ApolloProvider component from Apollo Client
import client from './apollo-client'; // Import the Apollo client
import { AuthProvider } from './utils/Auth'; // Import the AuthProvider component
import Home from './pages/Home'; // Import the Home component
import Dashboard from './pages/Dashboard'; // Import the Dashboard component
import Profile from './components/Profile/Profile'; // Import the Profile component
import Login from './components/Auth/Login'; // Import the Login component
import Signup from './components/Auth/Signup'; // Import the Signup component

// Define the App component to render the application
const App = () => {
  // Return the ApolloProvider component with the Apollo client and AuthProvider component
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App; // Export the App component

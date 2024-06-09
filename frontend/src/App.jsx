import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import { AuthProvider } from './utils/Auth';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './components/Profile/Profile';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ResetPassword from './pages/ResetPassword'; // Import the reset password page
import Navigation from './components/Navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/main.css';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <div className="main-container">
            <Header />
            <Navigation />
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/profile" component={Profile} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/reset-password" component={ResetPassword} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;

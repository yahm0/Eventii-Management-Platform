import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../../graphql/mutations';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { data, error }] = useMutation(SIGNUP_USER);
  const history = useHistory(); // Use useHistory hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({ name, email, password });
      const result = await signup({ variables: { userInput: { name, email, password } } });
      
      const token = result.data.signup.token; // Ensure this matches your GraphQL response
      console.log('Token received:', token); // Log the received token
      
      localStorage.setItem('token', token); // Store the token
      
      // Redirect to login page
      history.push('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign Up</button>
      {error && <p>Error signing up: {error.message}</p>}
    </form>
  );
};

export default Signup;

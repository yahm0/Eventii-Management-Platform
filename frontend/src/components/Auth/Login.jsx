import React, { useState } from 'react'; // Import the useState hook
import { useMutation } from '@apollo/client'; // Import the useMutation hook from Apollo Client
import { LOGIN_USER } from '../../graphql/mutations'; // Import the LOGIN_USER mutation

// Define the Login component to handle user login
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data }] = useMutation(LOGIN_USER);

  // Define the handleSubmit function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ variables: { email, password } });
      // Handle successful login (e.g., redirect, set token)
    } catch (error) {
      console.error(error);
    }
  };

  // Return a form for users to enter their email and password
  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login; // Export the Login component
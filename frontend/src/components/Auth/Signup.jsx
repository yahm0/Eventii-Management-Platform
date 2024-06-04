import React, { useState } from 'react'; // Import the useState hook
import { useMutation } from '@apollo/client'; // Import the useMutation hook from Apollo Client
import { SIGNUP_USER } from '../../graphql/mutations'; // Import the SIGNUP_USER mutation

// Define the Signup component to handle user signup
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { data, error }] = useMutation(SIGNUP_USER);

  // Define the handleSubmit function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({ name, email, password }); // Add this line to log form data
      await signup({ variables: { userInput: { name, email, password } } }); // Send userInput object
      // Handle successful signup (e.g., redirect, set token)
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  // Return a form for users to enter their name, email, and password
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
      {error && <p>Error signing up: {error.message}</p>} {/* Display any errors */}
    </form>
  );
};

export default Signup; // Export the Signup component

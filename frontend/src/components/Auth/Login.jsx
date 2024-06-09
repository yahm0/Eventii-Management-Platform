import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../graphql/mutations';
import { useHistory, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, error }] = useMutation(LOGIN_USER);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ variables: { email, password } });
      history.push('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
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
        {error && <p>Error logging in: {error.message}</p>}
      </form>
      <Link to="/reset-password-request" className="reset-password-button">
        Reset Password
      </Link>
    </div>
  );
};

export default Login;

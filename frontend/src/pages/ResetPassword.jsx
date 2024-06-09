import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/generate-reset-token', { email });
      setMessage(`Reset token generated: ${response.data.resetToken}`);
    } catch (error) {
      console.error('Error generating reset token:', error.response.data.message); // Log detailed error
      setMessage(`Error generating reset token: ${error.response.data.message}`);
    }
  };

  return (
    <div className="reset-password-container">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Generate Reset Token</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;

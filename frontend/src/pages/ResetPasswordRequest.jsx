import React, { useState } from 'react';

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/generate-reset-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setResetToken(data.resetToken);
        setMessage('Reset token generated, enter your new password');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error generating reset token');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">Generate Reset Token</button>
      </form>
      {message && <p>{message}</p>}
      {resetToken && <ResetPasswordForm resetToken={resetToken} />}
    </div>
  );
};

const ResetPasswordForm = ({ resetToken }) => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetToken, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Password reset successful');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error resetting password');
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
        required
      />
      <button type="submit">Reset Password</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ResetPasswordRequest;

const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Generate reset token
router.post('/generate-reset-token', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found with email:', email); // Log detailed error
      return res.status(400).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    res.status(200).json({ resetToken });
  } catch (error) {
    console.error('Error generating reset token:', error); // Log detailed error
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  const { resetToken, newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      console.error('Invalid or expired token for reset token:', resetToken); // Log detailed error
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = bcrypt.hashSync(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error); // Log detailed error
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

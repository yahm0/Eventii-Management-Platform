const express = require('express');
const jwt = require('jsonwebtoken');
const { generateToken, generateRefreshToken } = require('../config/auth');

const router = express.Router();

router.post('/refresh-token', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const newToken = generateToken({ id: user.id });
    const newRefreshToken = generateRefreshToken({ id: user.id });

    res.json({
      token: newToken,
      refreshToken: newRefreshToken,
    });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/healthcheck', (req, res) => {
  res.json({ message: 'API is working' });
});

module.exports = router;
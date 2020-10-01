const express = require('express');

const emojis = require('./emojis');
const Users = require('./user');
const Messsages = require('./messages');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: '/api/v1 = API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/users', Users);
router.use('/messages', Messsages);

module.exports = router;

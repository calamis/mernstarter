const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('message router');
})

module.exports = router;
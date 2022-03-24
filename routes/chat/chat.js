const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('chat/chat', { user: req.user })
});

module.exports = router;

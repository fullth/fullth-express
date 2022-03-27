const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.dir(req.user)
  
  if(req.user) {
    req.session.authenticate = true;
  }
  res.render('index', { user: req.user });
});

module.exports = router;

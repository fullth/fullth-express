const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.cookie('tester', {
  //   id: 'test',
  //   name: '테스트쿠키',
  //   authorized: true
  // })
  if(req.user) {
    req.session.authenticate = true;
  }
  res.render('index', { user: req.user });
});

module.exports = router;

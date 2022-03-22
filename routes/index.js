const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.cookie('tester', {
    id: 'test',
    name: '테스트쿠키',
    authorized: true
  })

  res.render('index', { title: 'Express' });
});

module.exports = router;

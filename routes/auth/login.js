const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    if(req.user) return res.redirect("/"); //이미 로그인 한 경우
    res.render('auth/login');
});

module.exports = router;
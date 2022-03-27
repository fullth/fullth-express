const express = require('express');
const router = express.Router();
const multer  = require('multer')
const con = require('../database/database');

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(301).redirect('/login');
  }
};

router.get('/', authenticateUser, function(req, res, next) {
  con.query('SELECT * FROM Images', function(err, result) {
    console.dir(result)
    res.render('home', {user: req.user, images: result});
  });
});

const upload = multer({ 
  dest: __dirname+'/uploads/', // 이미지 업로드 경로
}) 

router.post('/upload', upload.single('file'), (req, res, next) => {

  const { fieldname, originalname, mimetype, destination, filename, path, size } = req.file

  console.dir(req.file)

  let userId = req.session.passport.user;
  con.query('SELECT email FROM Users WHERE password = ?', userId, function(err, result) {
    console.log(`Users 테이블 email 컬럼 조회결과 => ${JSON.stringify(result)}`);
    let email = result[0].email;
    if (err) { throw err; }   
    
    con.query("INSERT INTO Images (image, owner, title, destination, path) VALUES (?, ?, ?, ?, ?)"
      , [filename, email, originalname, destination, path]
      , function(err) {
          if (err) { throw err; }   
    });
  });

  res.redirect('/home');
})

module.exports = router;

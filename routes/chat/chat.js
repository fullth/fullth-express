const express = require('express');
const router = express.Router();
const con = require('../../database/database');

router.get('/:imgSeq', (req, res) => {
  let imgSeq = req.params.imgSeq;
  con.query('SELECT * FROM Images WHERE id = ?', imgSeq, function(err, result) {
    console.dir(result)
    res.render('chat/chat', { user: req.user, imageInfo: result[0] })
  });
});

module.exports = router;

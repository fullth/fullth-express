const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const dbconfig   = require('../../config/database');
const connection = mysql.createConnection(dbconfig);

/* GET users listing. */
router.get('/', (req, res) => {
  connection.query('SELECT * from Users', (error, rows) => {
    if (error) throw error;
    
    console.log('User info is: ', rows);
    res.send(rows);
  });
});

module.exports = router;

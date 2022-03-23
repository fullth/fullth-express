/**
 * @Ref https://www.npmjs.com/package/mysql#establishing-connections
 */

const mysql = require('mysql');
const config = require('../config/database')

const con = mysql.createConnection(config.developement);

console.dir(config.developement)

con.connect((err) => {
  if (err) {
      console.error('데이터베이스 연결 중 오류가 발생하였습니다. : ' + err.stack);
      return;
    }
   
    console.log('데이터베이스에 연결되었습니다.:  ' + con.threadId);
});

module.exports = con;
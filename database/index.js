// DATABASE
const mysql = require('mysql');
require('dotenv').config();
let db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports.saveRoomInfo = (roomInfo, cb) => {
  db.query('select * from users', (err, results) => {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log('result : ', results);
    }
  });
};


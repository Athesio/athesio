// DATABASE
const mysql = require('mysql');

let db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports.saveUser = (user, cb) => {
  console.log('user: ', user);
  // db.query('insert into users (github_id, github_username)')
};

module.exports.saveRoomInfoForUser = (roomInfo, cb) => {
  console.log('in saveRoomInfoForUser roomInfo: ', roomInfo);

  // db.query('insert into * from users', (err, results) => {
  //   if (err) {
  //     console.log('error: ', err);
  //   } else {
  //     console.log('result : ', results);
  //   }
  // });
};

module.exports.getPreviousRoomsForUser = (user, cb) => {
  db.query('select * from users', (err, results) => {
    if (err) {
      console.log('error retrieving room info for user: ', err);
    } else {
      console.log('results retrieving previous rooms for user: ', results);
    }
  });
};


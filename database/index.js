// DATABASE
const mysql = require('mysql');
const moment = require('moment-timezone');

let db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// save or add user
module.exports.saveUser = (user, cb) => {
  // first check if user exists, if not, insert, if so, no action
  let findExistingUserQuery = `SELECT * FROM users WHERE github_id=?`;

  db.query(findExistingUserQuery, [user.id], (err, result) => {
    if (err) console.log('error finding existing user: ', err);
    else {
      if (result.length > 0) { // existing user, do not insert again
        cb(null, result)
      } else {
        let insertUserQuery = `INSERT INTO users (github_id, github_username, github_pic) VALUES (?, ?, ?)`;

        db.query(insertUserQuery, [user.id, user.login, user.avatar_url], (err, result) => {
            if (err) cb(err);
            else cb(null, result);
          });
      }
    }
  })
};

module.exports.saveRoomInfoForUser = (roomInfo, cb) => {
  console.log('in saveRoomInfoForUser roomInfo: ', roomInfo);
  this.saveUser(roomInfo.user, (err, _) => {
    if (err) {
      console.log('error saving user to DB: ', err);
      cb(err);
    } else {
      let checkIfRoomRecordExistsQuery = `SELECT * FROM rooms WHERE room_uuid=?`;
      db.query(checkIfRoomRecordExistsQuery, [roomInfo.roomId], (err, result) => {
        if (err) {
          console.log('error checking room table for existing record: '.err);
          cb(err);
        }
        else {
          // existing record, only update that record's last_modified_date field
          if (result.length > 0) {
            let updateModifiedDateQuery = `UPDATE rooms SET last_modified_date=? WHERE room_uuid=?`;
            let newModifiedDate = moment().tz('America/Chicago').format();
            console.log('new modified date :', newModifiedDate);
            db.query(updateModifiedDateQuery, [newModifiedDate, roomInfo.roomId], (err, result) => {
              if (err) {
                console.log('error updating last modified date in rooms table: ', err);
                //cb(err);
              }
              else {
                console.log('successfully updated modified date: ', result);
                cb(null, result);
              }
            });
          } else { // new record
            let insertRoomQuery = `INSERT INTO rooms (room_uuid, firebase_ref, create_date, last_modified_date) VALUES (?, ?, ?, ?)`;
            // let newDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
            let newDate = moment().tz('America/Chicago').format();

            db.query(insertRoomQuery, [roomInfo.roomId, roomInfo.ref, newDate, newDate], (err, results) => {
              if (err) {
                console.log('error saving room info to DB: ', err);
                // cb(err, null);
              } else {
                let insertUserRoomQuery = `INSERT INTO users_rooms (user_id, room_id) VALUES ((SELECT id FROM users WHERE github_id=${roomInfo.user.id}), (SELECT id FROM rooms WHERE room_uuid='${roomInfo.roomId}'))`;

                db.query(insertUserRoomQuery, (err, result) => {
                  if (err) {
                    console.log('error inserting new users_rooms records: ', err);
                    //cb(err);
                  }
                  else {
                    console.log('successfully created new users_rooms record: ', result);
                    // cb(null, result);
                  }
                });
              }
            });
          }
        }
      });
      
    }
  });
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

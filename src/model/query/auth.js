const connection = require('../database/db_connection.js');
const insertData = (name, number, password, cb) => {
  const sql = {
    text: `insert into users(name,phone_number,password,email,photo,description)
      VALUES ($1, $2, $3,$4,$5,$6) RETURNING id`,
    values: [name, phone_number, password, email, photo.description]
  };
  connection.query(sql, (err, data) => {
    if (err) cb(err);
    else {
      cb(null, data.rows);
    }
  });
};

const selectData = (phone, cb) => {
  const sql = {
    text: `select * from users where email = $1`,
    values: [phone]
  };
  connection.query(sql, (err, data) => {
    if (err) cb(err);
    else {
      cb(null, data.rows);
    }
  });
};
module.exports = {
  insertData,
  selectData
};

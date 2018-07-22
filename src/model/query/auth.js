const connection = require('../database/db_connection.js');
const insertData = (name, phone_number, password, email, cb) => {
  const sql = {
    text: `insert into users(name,phone_number,password,email)
      VALUES ($1, $2, $3,$4) RETURNING id`,
    values: [name, phone_number, password, email]
  };
  connection.query(sql, (err, data) => {
    if (err) cb(err);
    else {
      cb(null, data.rows);
    }
  });
};

const selectData = (email, cb) => {
  const sql = {
    text: `select * from users where email = $1`,
    values: [email]
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

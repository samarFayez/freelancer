const connection = require('../database/db_connection.js');
const insertProject = (user_id, title, details, duration, price, cb) => {
  const sql = {
    text: `insert into posts(user_id, title, details, duration,price,datePost)
      VALUES ($1, $2, $3,$4,$5,$6) RETURNING id`,
    values: [user_id, title, details, duration, price, getDateTime()]
  };
  connection.query(sql, (err, data) => {
    if (err) cb(err);
    else {
      cb(null, data.rows);
    }
  });
};
const insertProjectSkill = (post_id, skill, cb) => {
  const sql = {
    text: `insert into post_skills(post_id, skill)
      VALUES ($1, $2) RETURNING id`,
    values: [post_id, skill]
  };
  connection.query(sql, (err, data) => {
    if (err) cb(err);
    else {
      cb(null, data.rows);
    }
  });
};
const insertProjectFiles = (post_id, file, fileName, cb) => {
  const sql = {
    text: `insert into post_files(post_id, file,fileName)
      VALUES ($1, $2,$3) RETURNING id`,
    values: [post_id, file, fileName]
  };
  connection.query(sql, (err, data) => {
    if (err) cb(err);
    else {
      cb(null, data.rows);
    }
  });
};

const allProject = cb => {
  const sql = `SELECT users.*, posts.* from users
  INNER JOIN posts on users.id = posts.user_id ORDER BY posts.id DESC`;
  connection.query(sql, (err, data) => {
    if (err) cb(err);
    else {
      cb(null, data.rows);
    }
  });
};

const allFiles = cb => {
  sql = `select * from post_files`;
  connection.query(sql, (err, data) => {
    if (err) cb(err);
    else {
      cb(null, data.rows);
    }
  });
};

const allSkills = cb => {
  sql = `select * from post_skills`;
  connection.query(sql, (err, data) => {
    if (err) cb(err);
    else {
      cb(null, data.rows);
    }
  });
};
const addComment = (user_id, post_id, description, cb) => {
  const sql = {
    text: `insert into comments(user_id, post_id, description)
      VALUES ($1, $2,$3) RETURNING id`,
    values: [user_id, post_id, description]
  };
  connection.query(sql, (err, data) => {
    if (err) cb(err);
    else {
      cb(null, data.rows);
    }
  });
};
const allComments = cb => {
  sql = `SELECT users.*, comments.* from users
  INNER JOIN comments on users.id = comments.user_id ORDER BY comments.id ASC`;
  connection.query(sql, (err, data) => {
    if (err) cb(err);
    else {
      cb(null, data.rows);
    }
  });
};
function getDateTime() {
  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? '0' : '') + hour;

  var min = date.getMinutes();
  min = (min < 10 ? '0' : '') + min;

  var sec = date.getSeconds();
  sec = (sec < 10 ? '0' : '') + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? '0' : '') + month;

  var day = date.getDate();
  day = (day < 10 ? '0' : '') + day;

  return year + ':' + month + ':' + day + '_' + hour + ':' + min + ':' + sec;
}
module.exports = {
  insertProject,
  insertProjectSkill,
  insertProjectFiles,
  allProject,
  allFiles,
  allSkills,
  addComment,
  allComments
};

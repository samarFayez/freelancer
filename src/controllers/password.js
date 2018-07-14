const bcrypt = require('bcryptjs');
const hashedPassword = (password, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) cb(err);
    else {
      bcrypt.hash(password, salt, (err, hash) => {
        cb(err, hash);
      });
    }
  });
};

const comparePassword = (password, hashedPassword, cb) => {
  bcrypt.compare(password, hashedPassword, (err, res) => {
    if (err) cb(err);
    else {
      cb(null, res);
    }
  });
};
module.exports = {
  hashedPassword,
  comparePassword
};

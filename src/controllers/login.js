const hashpassword = require('./password.js');
const auth = require('../model/query/auth.js');
const jwt = require('jsonwebtoken');
require('env2')('./config.env');
const GETlogin = (req, res) => {
  res.status(200).render('login', {
    layout: false
  });
}
const PostLogin = (req, res) => {
  const {
    phone
  } = req.body;
  const password = req.body.password_l;
  auth.selectData(phone, (err, data) => {
    if (err) {
      console.log(err);
      res.redirect('/err')
    } else if (data.length == 0) {
      res.render('login', {
        layout: false,
        err: true,
        msg: 'You must register'
      });
    } else {
      hashpassword.comparePassword(password, data[0].password, (err, isTrue) => {
        if (isTrue) {
          const userData = {
            id: data[0].id,
            name: data[0].name,
            role: data[0].role
          }
          const token = jwt.sign(userData, process.env.SECRET_KEY);
          if (data[0].role == 'user') {
            res.cookie('accessToken', token).redirect('/');
          } else {
            res.cookie('accessToken', token).redirect('/user-orders');
          }
        } else {
          res.render('login', {
            layout: false,
            err: true,
            msg: 'Password is not correct'
          });
        }
      });
    }
  });
}
module.exports = {
  GETlogin,
  PostLogin
}

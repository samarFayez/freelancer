const hashpassword = require('./password.js');
const auth = require('../model/query/auth.js');
const jwt = require('jsonwebtoken');
require('env2')('./config.env');
const GETlogin = (req, res) => {
  res.status(200).render('login', {
    layout: false
  });
};
const PostLogin = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  auth.selectData(email, (err, data) => {
    if (err) {
      console.log(err);
      res.redirect('/err');
    } else if (data.length == 0) {
      res.render('login', {
        layout: false,
        err: true,
        mssg: 'the email is not register'
      });
    } else {
      hashpassword.comparePassword(
        password,
        data[0].password,
        (err, isTrue) => {
          if (isTrue) {
            console.log('here');
            const userData = {
              id: data[0].id,
              name: data[0].name,
              email: data[0].email
            };
            const token = jwt.sign(userData, process.env.SECRET_KEY);
            res.cookie('accessToken', token);
            res.redirect('/showProject');
          } else {
            res.render('login', {
              layout: false,
              err: true,
              mssg: 'Password is not correct'
            });
          }
        }
      );
    }
  });
};
module.exports = {
  GETlogin,
  PostLogin
};

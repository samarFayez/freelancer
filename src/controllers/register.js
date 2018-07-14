const hashpassword = require('./password.js');
const auth = require('../model/query/auth.js');
const jwt = require('jsonwebtoken');
require('env2')('./config.env');
const GETregister = (req, res, next) => {
  res.render('register', {
    layout: false
  });
}
const PostRegister = (req, res) => {
  const {
    name,
    password
  } = req.body;
  const number = req.body.numb;
  const conPassword = req.body.password_conf;
  if (password === conPassword) {
    hashpassword.hashedPassword(password, (err, hash) => {
      if(err) res.render('error',{layout:false,error:err.toString()})
      auth.insertData(name, number, hash, (err, response) => {
        if (err) {
          res.render('register', {
            error: true,
            mssg: 'This account already exists',
            layout: false
          })

        } else {
          const userData = {
            id: response[0].id,
            name: name,
            role: 'user'
          }
          const token = jwt.sign(userData, process.env.SECRET_KEY);
          res.cookie('accessToken', token);
          res.redirect('/');
        }
      });
    });
  } else {
    res.render('register', {
      err: true,
      mssg: 'Passwords do not match',
      layout: false
    });
  }
}
module.exports = {
  GETregister,
  PostRegister
}

const express = require('express');
const router = express.Router();

const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const home = require('./home');

router.get('/freelancer', home);
router.get('/login', login.GETlogin);
router.post('/login', login.PostLogin);
router.get('/register', register.GETregister);
router.post('/register', register.PostRegister);
router.get('/logout', logout);
module.exports = router;

const express = require('express');
const router = express.Router();

const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const home = require('./home');
const freelancer = require('./freelancer');

router.get('/freelancer', home.home);
router.get('/login', login.GETlogin);
router.post('/login', login.PostLogin);
router.get('/register', register.GETregister);
router.post('/register', register.PostRegister);
router.get('/', freelancer.getFreelancer);
router.get('/logout', logout);
module.exports = router;

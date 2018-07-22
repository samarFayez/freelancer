const express = require('express');
const router = express.Router();

const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const home = require('./home');
const showProject = require('./showProject');
const addProject = require('./addProject');
const verfiycookie = require('./verfiycookie');
const profile = require('./profile');
const addComment = require('./addComment');
const updateProfile = require('./updateProfile');
router
  .get('/', home.home)
  .get('/login', login.GETlogin)
  .post('/login', login.PostLogin)
  .get('/register', register.GETregister)
  .post('/register', register.PostRegister)
  .get('/showProject', verfiycookie, showProject.showProject)
  .get('/addProject', verfiycookie, addProject.addProject)
  .post('/addProject', verfiycookie, addProject.postAddProject)
  .get('/profile', verfiycookie, profile.profile)
  .post('/addComment', verfiycookie, addComment.addComment)
  .get('/update-profile', updateProfile.updateProfile)
  .get('/logout', logout);
module.exports = router;

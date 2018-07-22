const auth = require('../model/query/auth');

const profile = (req, res) => {
  const { email } = req.user;
  auth.selectData(email, (err, user) => {
    const username = email.split('@')[0];
    console.log(username);
    res.render('profile', { user: user[0], username });
  });
};
module.exports = { profile };

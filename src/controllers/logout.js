const logout = (req, res) => {
  res.clearCookie('accessToken');
  res.status(200).redirect('/');
};
module.exports = logout;

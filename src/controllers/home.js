const path = require('path');
const home = (req, res) => {
  // res.sendFile(path.join(__dirname, '../../public', 'index.html'));

  res.render('index', { layout: false });
};

module.exports = { home };

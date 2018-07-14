const express = require ('express');
const path = require ('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const controllers = require('./controllers/index');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','hbs');
app.engine('hbs',exphbs({
  extname:'hbs',
  layoutsDir:path.join(__dirname,'views','layouts'),
  partialsDir:path.join(__dirname,'views','partials'),
  defaultLayout:'main'
}));
app.use(cookieParser());
app.use(controllers);
app.set('port', process.env.PORT || 3000);
module.exports = app;

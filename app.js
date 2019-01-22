'use strict';
var env  = require('dotenv').config();
const nodemailer = require('nodemailer');
var events = require( 'events' );
//var bootstrap = require( 'bootstrap' );
//const Sequelize = require('sequelize');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mysql = require('mysql');
var myConnection = require('express-myconnection'); // express-myconnection module 
var hbs = require('hbs');
var fs = require('fs');

console.log(process.env.NODE_ENV)
//Authentication packages
var bcrypt = require('bcrypt-nodejs');
var securePin = require('secure-pin');
var passport = require('passport');
var localStrategy = require('passport-local'),Strategy;
var session = require('express-session');
var MySQLStore = require ('express-mysql-session')(session);
var flash = require('express-flash-messages');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var db = require('./db.js'); 

var app = express();
//emitter.setMaxListeners(0);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//get new partials
var messageTemplate = fs.readFileSync(__dirname + '/views/messages.hbs', 'utf8');
hbs.registerPartial('message', messageTemplate); 

var mainnavTemplate = fs.readFileSync(__dirname + '/views/mainnav.hbs', 'utf8');
hbs.registerPartial('mainnav', mainnavTemplate); 

var noearnTemplate = fs.readFileSync(__dirname + '/views/noearn.hbs', 'utf8');
hbs.registerPartial('noearn', noearnTemplate); 

var noearnTemplate = fs.readFileSync(__dirname + '/views/noenter.hbs', 'utf8');
hbs.registerPartial('noenter', noearnTemplate); 

var mainhTemplate = fs.readFileSync(__dirname + '/views/mainh.hbs', 'utf8');
hbs.registerPartial('mainh', mainhTemplate); 

var mainfTemplate = fs.readFileSync(__dirname + '/views/mainf.hbs', 'utf8');
hbs.registerPartial('mainf', mainfTemplate); 

var dashboardhTemplate = fs.readFileSync(__dirname + '/views/spageh.hbs', 'utf8');
hbs.registerPartial('spageh', dashboardhTemplate); 

var dashboardfTemplate = fs.readFileSync(__dirname + '/views/spagef.hbs', 'utf8');
hbs.registerPartial('spagef', dashboardfTemplate); 

var navTemplate = fs.readFileSync(__dirname + '/views/nav.hbs', 'utf8');
hbs.registerPartial('nav', navTemplate); 



var earningsTemplate = fs.readFileSync(__dirname + '/views/earnings.hbs', 'utf8');
hbs.registerPartial('earning', earningsTemplate); 




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var options = {
  waitForConnections: true,
  connectionLimit : 100,
  host: "localhost",
  user: "root",
  //password: 'swiftrevolver',
  database: "keli"
};

app.use(myConnection(mysql, options, 'pool')); 

var sessionStore = new MySQLStore(options);
  
app.use(session({
  secret: 'keybaby',
  resave: false,
  store: sessionStore,
  saveUninitialized: false,
  /**cookie:
    #secure: true**/
  }));

  //passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(function(req, res, next){
  res.locals.isAuthenticated = req.isAuthenticated();
  next(); 
})
app.use('/', indexRouter);
app.use('/users', usersRouter); 

/*function verify(x){
	db.query( 'SELECT verification FROM user WHERE username = ?', [x], function ( err, results, fields ){
		if( err ) throw err;
		var verification = results[0].verification;
		if( verification === null ){
			res.redi
		}
	});
}*/
passport.use(new localStrategy(function(username, password, done){
    console.log(username);
    console.log(password);
    const db = require('./db.js');
    
    db.query('SELECT user_id, password FROM user WHERE username = ?', [username], function (err, results, fields){
      if (err) {done(err)};
      if (results.length === 0){
        done(null, false, {
        	message: 'Invalid Username'
        });
      }
      else{
        console.log(results[0]);
        const hash = results[0].password.toString();

        bcrypt.compare(password, hash, function(err, response){
          if (response === true){
            return done(null, {user_id: results[0].user_id});
          }
          else{
            return done(null, false,{
            	message:'Invalid Password'
            });
        }
      });
      
      }
      
    });
}));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
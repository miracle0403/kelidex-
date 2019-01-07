exports.sendreset = function sendreset(user, email){
  var db = require( '../db.js' );
  var securePin = require( 'secure-pin' );
  var bcrypt = require('bcrypt-nodejs');
function rounds( err, results ){ 
	if ( err ) throw err;
}
const saltRounds = bcrypt.genSalt( 10, rounds);

   //import the mail variable
	var reset = require( '../nodemailer/passwordreset.js' );
		//select the variables in it
		db.query( 'SELECT username, email, user_id, sponsor FROM user WHERE username = ?', [user], function ( err, results, fields ){
			if ( err ) throw err;
			var rese = {
				user_id: results[0].user_id,
				username: results[0].username,
				sponsor: results[0].sponsor,
		//		password: results[0].password,
				email: results[0].email
			}
			//exports.rese = rese;
			//generate code for verify mail
			securePin.generatePin(10, function(pin){
      			bcrypt.hash(pin, saltRounds, null, function(err, hash){
      			//exports.pin = pin;
       			 db.query('INSERT INTO reset (code, user, status) VALUES (?, ?, ?)', [hash, user, 'active'], function(error, results, fields){
         				 if (error) throw error;
         				 reset.passwordreset(rese.email, rese.user_id, rese.sponsor, rese.username, pin );
         			 });
         		});
         	});
	});
}



exports.sendverify = function sendverify(user, email, code, password){
  var db = require( '../db.js' );
  var securePin = require( 'secure-pin' );
  var bcrypt = require('bcrypt-nodejs');
function rounds( err, results ){ 
	if ( err ) throw err;
}
const saltRounds = bcrypt.genSalt( 10, rounds);

   //import the mail variable
	var verify = require( '../nodemailer/verification.js' );
		//select the variables in it
		db.query( 'SELECT username, full_name, password, phone, email, user_id, sponsor FROM user WHERE username = ?', [user], function ( err, results, fields ){
			if ( err ) throw err;
			var rese = {
				user_id: results[0].user_id,
				phone: results[0].phone,
				username: results[0].username,
				sponsor: results[0].sponsor,
				password: results[0].password,
				email: results[0].email,
				fullname: results[0].full_name
			}
			//exports.rese = rese;
			//generate code for verify mail
			securePin.generatePin(10, function(pin){
      			bcrypt.hash(pin, saltRounds, null, function(err, hash){
      		//	exports.pin = pin;
       			 db.query('INSERT INTO verify (code, user, status) VALUES (?, ?, ?)', [hash, user, 'active'], function(error, results, fields){
         				 if (error) throw error;
         				  verify.verifymail( user, email, code, password, rese.sponsor, rese.fullname, rese.phone, pin);
         			 });
         		});
         	});
	});
}
exports.newreferral = function ( x, a, b){
	var db = require( '../db.js' );
	var referral = require( '../nodemailer/new_referral.js' );
	db.query( 'SELECT full_name, email FROM user WHERE username = ?', [x], function ( err, results, fields ){
		if( err ) throw err;
		var spon = {
			fullname: results[0].full_name,
			email: results[0].email
		}
		referral.newreferral( spon.fullname, spon.email, a, b )
	});
}
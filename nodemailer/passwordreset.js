exports.passwordreset= function passwordreset(x, id, sponsor, username, pin){ 
	var nodemailer = require('nodemailer');
	/*var mail = require( '../functions/mailfunctions.js' );
	var trysend = mail.rese;
	var pin = mail.pin;
	console.log( trysend );*/
	var hbs = require('nodemailer-express-handlebars');
	var transporter = nodemailer.createTransport({ 
		host: 'mail.privateemail.com', 
		port: 465, 
		secure: true, // true for 465, false for other ports
		auth: { 
			user: 'admin@swiftrevolver.com', // generated ethereal 
			pass:  '*Cw1Gw:ZdERt%' // generated ethereal password } }); 
		  }
    });
transporter.use('compile', hbs({ viewPath: './views/mail', extName: '.hbs' })); 

//the message properties
	var mailOptions = {
  		from: 'admin@swiftrevolver.com',
  		to: x,
  		subject: 'Password Reset',
		template: 'emailreset',
  		context: {
  			username: username,
  			email: x,
  			sponsor: sponsor,
  			pin: pin,
  			id: id
  		}
	}
	
// send the mail
	transporter.sendMail(mailOptions, function(error, info) { 
		if (error) {
			return console.log(error); 
		} 
		console.log('Message sent: %s', info.messageId);
		//console.log(module.exports.email);
  	});
}
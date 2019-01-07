//user, email, code, password, rese.sponsor, rese.fullname, rese.phone, rese.pin
exports.verifymail = function verifymail(user, x, code, password, sponsor, fullname, phone, pin){
	var nodemailer = require('nodemailer');
	var link = 'localhost:1437/' + user + '/' + x + '/' + password + '/' + code + '/' + pin;
	
	//console.log( code);
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
transporter.use('compile', hbs({ viewPath: './views/mail/', extName: '.hbs' })); 

//the message properties
	var mailOptions = {
  		from: 'admin@swiftrevolver.com',
  		to: x,
  		subject: 'Welcome to SWIFT REVOLVER', 
		template: 'emailverify',
  		context: {
  			password: password,
  			fullname: fullname,
  			username: user,
  			pin: pin,
  			email: x,
  			code: code,
  			sponsor: sponsor,
  			phone: phone
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
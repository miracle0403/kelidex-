exports.newmatrix = function newmatrix(x){
	var nodemailer = require('nodemailer');
	var hbs = require('nodemailer-express-handlebars');
	var transporter = nodemailer.createTransport({ 
		host: 'server206.web-hosting.com', 
		port: 26, 
		secure: false, // true for 465, false for other ports
		auth: { 
			user: 'noreply@swiftcircle.website', // generated ethereal 
			pass:  '{}' // generated ethereal password } }); 
		  }
    });
transporter.use('compile', hbs({ viewPath: './views/', extName: '.hbs' })); 

//the message properties
	var mailOptions = {
  		from: 'noreply@swiftcircle.website',
  		to: x,
  		subject: 'New Matrix Alert',
		template: 'newmatrix'
  		
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



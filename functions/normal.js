var db = require( '../db.js' );
var newmatrix = require ('./newmatrix.js');
var newfeeder = require( './newfeederspill.js' );
exports.nospon = function(username, sponsor, res){
	//check if the person has a matrix already
	db.query('SELECT * FROM feeder WHERE user = ?', [username], function(err, results, fields){
		if( err ) throw err;
		if (results.length === 0){
			//start the entering process.
			newmatrix.matrix(username, sponsor, res);
		}else{
			//get variables for the a, b and call
			var last = results.slice(-1)[0];
			var user  = {
				user_status: last.status,
				a: last.a,
				b: last.b,
				c: last.c
			}
			//check if the status is not confirmed.
			if(user.user_status !== 'confirmed'){
				var error = 'You cannot join the matrix for now because you have an unconfirmed order. please check back later.';
				res.render('status', {error: error});
			}else{
				//check if the a b and c is null
				if (user.a === null || user.b === null || user.c === null){
					//return the user to the join matrix
					var error = 'You cannot join the matrix again because you have not completed this matrix... refer more persons and try again.';
					res.render('status', {error: error});
				}else{
				//get the first to trace the matrix.
					db.query('SELECT user FROM feeder WHERE user = ?', [username], function(err, results, fields){
						if( err ) throw err;
						var user = results[0].user;
						newfeeder.feederspill( username, user, sponsor, res);
					});
				}
			}
		}
	});
}
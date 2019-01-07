var db  = require( '../db.js' );
var stage3func = require( './stage3spill.js' );
var stage4func = require( './stage4.js' );
exports.stage3 = function stage3( x, res){
	db.query('SELECT parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.stage3 is not null ORDER BY parent.lft', [x], function(err, results, fields){
		if ( err ) throw err;
		var last3 = results.slice( -2)[0];
		var s3user = last3.user;
		var s3spon = last.sponsor;
		db.query('SELECT * FROM stage3_tree WHERE user = ?', [s3user], function(err, results, fields){
			if (err) throw err;
			var stage3 = {
				a: results[0].a,
				b: results[0].b,
				c: results[0].c,
				d: results[0].d
			}
			if(stage3.a === null && stage3.b === null && stage3.c === null && stage3.d === null){
				//update into the sponsor set
				db.query('UPDATE stage3_tree SET a = ? WHERE user = ?', [x, s3user], function(err, results, fields){
					if(err) throw err;
					//call the procedure for adding
					db.query('CALL stage3try(?,?,?)', [s3spon, s3user, x], function(err, results, fields){
						if (err) throw err;
						res.render('register', {title: 'Successful Entrance'});
																			
					});
				});
			}
			if(stage3.a !== null && stage3.b === null && stage3.c === null && stage3.d === null){
				//update into the sponsor set
				db.query('UPDATE stage3_tree SET b = ? WHERE user = ?', [x, s3user], function(err, results, fields){
					if(err) throw err;
					//call the procedure for adding
					db.query('CALL stage3try(?,?,?)', [s3spon, s3user, x], function(err, results, fields){
						if (err) throw err;
						res.render('register', {title: 'Successful Entrance'});
																			
					});
				});
			}
			if(stage3.a !== null && stage3.b !== null && stage3.c === null && stage3.d === null){
				//update into the sponsor set
				db.query('UPDATE stage3_tree SET c = ? WHERE user = ?', [x, s3user], function(err, results, fields){
					if(err) throw err;
					//call the procedure for adding
					db.query('CALL stage3try(?,?,?)', [s3spon, s3user, x], function(err, results, fields){
						if (err) throw err;
						res.render('register', {title: 'Successful Entrance'});
																			
					});
				});
			}
			if(stage3.a !== null && stage3.b !== null && stage3.c !== null && stage3.d === null){
				//update into the sponsor set
				db.query('UPDATE stage3_tree SET a = ? WHERE user = ?', [x, s3user], function(err, results, fields){
					if(err) throw err;
					//call the procedure for adding
					db.query('CALL stage3try(?,?,?)', [s3spon, s3user, x], function(err, results, fields){
						if (err) throw err;
						db.query('CALL stage3Amount(?)', [s3user], function(err, results, fields){
							if (err) throw err;
							//call function to enter stage 4
							stage4func.stage4( s3user, res);
						});
					});
				});
			}
			if(stage3.a !== null && stage3.b !== null && stage3.c !== null && stage3.d !== null){
				//call function for stage 3 spillover
				stage3func.stage3spill( x, s3user, s3spon, res);
			}
			
		});
	});
}
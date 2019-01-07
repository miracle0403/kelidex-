var db  = require( '../db.js' );
var stage4func = require( '../functions/stage4spill.js' );
exports.stage4 = function stage4(x,res){
	db.query('SELECT parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.stage4 is not null ORDER BY parent.lft', [x], function(err, results, fields){
		if( err ) throw err;
		var last4 = results.slice( -1)[0];
		var s4user = last4.user;
		var s4spon = last4.sponspor;
		db.query('SELECT * FROM stage4_tree WHERE user = ?', [s4user], function(err, results, fields){
			if( err ) throw err;
			var stage4  = {
				a: results[0].a,
				b: results[0].b,
				c: results[0].c,
			  	d: results[0].d
			}
			if(stage4.a === null && stage4.b === null && stage4.c === null && stage4.d === null){
				db.query('UPDATE stage4_tree SET a = ? WHERE user = ?', [x,  s4user], function(err, results, fields){
					if( err ) throw err;
					db.query('CALL stage4try(?,?,?)', [s4spon, s4user, x], function(err, results, fields){
				  		if (err) throw err;
						res.render('register', {title: 'Successful Entrance'});
					});
				});
			}
			if(stage4.a !== null && stage4.b === null && stage4.c === null && stage4.d === null){
				db.query('UPDATE stage4_tree SET b = ? WHERE user = ?', [x,  s4user], function(err, results, fields){
					if( err ) throw err;
					db.query('CALL stage4try(?,?,?)', [s4spon, s4user, x], function(err, results, fields){
				  		if (err) throw err;
						res.render('register', {title: 'Successful Entrance'});
					});
				});
			}
			if(stage4.a !== null && stage4.b !== null && stage4.c === null && stage4.d === null){
				db.query('UPDATE stage4_tree SET c = ? WHERE user = ?', [x,  s4user], function(err, results, fields){
					if( err ) throw err;
					db.query('CALL stage4try(?,?,?)', [s4spon, s4user, x], function(err, results, fields){
				  		if (err) throw err;
						res.render('register', {title: 'Successful Entrance'});
					});
				});
			}
			if(stage4.a !== null && stage4.b !== null && stage4.c !== null && stage4.d === null){
				db.query('UPDATE stage4_tree SET d = ? WHERE user = ?', [x,  s4user], function(err, results, fields){
					if( err ) throw err;
					db.query('CALL stage4try(?,?,?)', [s4spon, s4user, x], function(err, results, fields){
				  		if (err) throw err;
				  		db.query('CALL stage4Amount(?)', [s4user], function(err, results, fields){
				  			if( err ) throw err;
							res.render('register', {title: 'Successful Entrance'});
						});
					});
				});
			}
			if(stage4.a !== null && stage4.b !== null && stage4.c !== null && stage4.d === null){
				//call function for stage 4 spillover here
				stage4func.stage4spill( x, s4user, res);
			}
		});
	});
}
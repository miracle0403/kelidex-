var db = require( '../db.js' );
var newfeeder = require( './newfeederspill.js' );
exports.start = function(username, sponinherit, sponsor, res){
	//get the person he or she should be under.
	db.query('SELECT parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.feeder is not null ORDER BY parent.lft', [username], function(err, results, fields){
		if ( err ) throw err;
		var last = results.slice( -2)[0];
		var user = last.user;
		db.query('SELECT * FROM feeder_tree WHERE user = ?', [user], function(err, results, fields){
			if (err) throw err;
			var feeder = {
				a: results[0].a,
				b: results[0].b,
				c: results[0].c
			}
			if(feeder.a === null && feeder.b === null && feeder.c === null){
				//get the stuffs to do
				db.query('UPDATE feeder_tree SET a = ? WHERE user = ?', [username, user], function(err, results, fields){
					if(err) throw err;
					//call the procedure for adding
					db.query('CALL leafadd(?,?)', [user, username], function(err, results, fields){
						if (err) throw err;
						//get the account details of the user
						db.query('SELECT * FROM profile WHERE user = ?', [user], function(err, results, fields){
							if ( err ) throw err;
							var bank = {
								bank: results[0].bank,
								account_name: results[0].account_name,
								account_number: results[0].account_number
							}
							//get the phone number of the user
							db.query('SELECT full_name, phone, code FROM user WHERE username = ?', [user], function(err, results, fields){
								if ( err ) throw err;
								//get the user details
								var contact = {
									full_name: results[0].full_name,
									phone: results[0].phone,
									code: results[0].code
								}
								//enter it into the order table
								db.query('CALL earnings(?,?,?,?,?,?,?,?)', [user, contact.full_name, contact.phone, contact.code, bank.bank, bank. account_name, bank.account_number], function(err, results, fields){
									if (err) throw err;
									res.redirect('dashboard');
								});
							});
						});
					});
				});
			}
			if(feeder.a !== null && feeder.b === null && feeder.c === null){
				//get the stuffs to do
				db.query('UPDATE feeder_tree SET b = ? WHERE user = ?', [username, user], function(err, results, fields){
					if(err) throw err;
					//call the procedure for adding
					db.query('CALL leafadd(?,?)', [user, username], function(err, results, fields){
						if (err) throw err;
						//get the account details of the user
						db.query('SELECT * FROM profile WHERE user = ?', [sponinherit], function(err, results, fields){
							if ( err ) throw err;
							var bank = {
								bank: results[0].bank,
								account_name: results[0].account_name,
								account_number: results[0].account_number
							}
							//get the phone number of the user
							db.query('SELECT full_name, phone, code FROM user WHERE username = ?', [sponinherit], function(err, results, fields){
								if ( err ) throw err;
								//get the user details
								var contact = {
									full_name: results[0].full_name,
									phone: results[0].phone,
									code: results[0].code
								}
								//enter it into the order table
								db.query('CALL earnings(?,?,?,?,?,?,?,?)', [user, contact.full_name, contact.phone, contact.code, bank.bank, bank. account_name, bank.account_number], function(err, results, fields){
									if (err) throw err;
									res.redirect('dashboard');
								});
							});
						});
					});
				});
			}
			if(feeder.a !== null && feeder.b !== null && feeder.c === null){
				//get the stuffs to do
				db.query('UPDATE feeder_tree SET c = ? WHERE user = ?', [username, user], function(err, results, fields){
					if(err) throw err;
					//call the procedure for adding
					db.query('CALL leafadd(?,?)', [user, username], function(err, results, fields){
						if (err) throw err;
						//get the account details of the user
						db.query('SELECT * FROM profile WHERE user = ?', [user], function(err, results, fields){
							if ( err ) throw err;
							var bank = {
								bank: results[0].bank,
								account_name: results[0].account_name,
								account_number: results[0].account_number
							}
							//get the phone number of the user
							db.query('SELECT full_name, phone, code FROM user WHERE username = ?', [user], function(err, results, fields){
								if ( err ) throw err;
								//get the user details
								var contact = {
									full_name: results[0].full_name,
									phone: results[0].phone,
									code: results[0].code
								}
								//enter it into the order table
								db.query('CALL earnings(?,?,?,?,?,?,?,?)', [user, contact.full_name, contact.phone, contact.code, bank.bank, bank. account_name, bank.account_number], function(err, results, fields){
									if (err) throw err;
									res.redirect('dashboard');
								});
							});
						});
					});
				});
			}
			if(feeder.a === null && feeder.b === null && feeder.c === null){
				//get spillovers
				newfeeder.feederspill( username, user, sponinherit, res);
			}
		});
	});
}
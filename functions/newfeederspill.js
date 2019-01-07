var db = require( '../db.js' ); 
exports.feederspill = function feederspill( username, user, sponsor, res){
	db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount < 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user AND status = ? GROUP BY node.user HAVING depth > 0 ORDER BY depth', [user, 'confirmed'], function(err, results, fields){
		if( err ) throw err;
		var feederdepth = results[0].depth;
		db.query('SELECT node.user, node.a, node.b, node.c, status, (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 0 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user AND status = ? HAVING depth > 0 ORDER BY depth', [user, 'confirmed'], function(err, results, fields){
			if (err) throw err;
			if (results.length === 0){
				var error = 'We are very sorry, there is actually no one qualified to receive in your  tree... please check back later';
				res.render('status', {error: error});
			}else{
				var feeder1spill = {
					a: results[0].a,
					b: results[0].b,
					c: results[0].c,
					user: results[0].user,
					depth: results[0].depth,
					amount: results[0].amount
				}
				if (feeder1spill.depth === feederdepth){
					//place in a automatically... as there is no other place to drop it.
					//get the stuffs to do
					db.query('UPDATE feeder SET a = ? WHERE user = ?', [username, feeder1spill.user], function(err, results, fields){
						if(err) throw err;
						//call the procedure for adding
						//get a unique pin
						securePin.generatePin(5, function(pin){
							var pin1 = pin;
							db.query('CALL leafadd(?,?,?)', [feeder1spill.user, pin1, username], function(err, results, fields){
								if (err) throw err;
								//get the account details of the user
								db.query('SELECT * FROM profile WHERE user = ?', [feeder1spill.user], function(err, results, fields){
									if ( err ) throw err;
									var bank = {
										bank: results[0].bank,
										account_name: results[0].account_name,
										account_number: results[0].account_number
									}
									//get the phone number of the user
									db.query('SELECT full_name, phone, code FROM user WHERE username = ?', [feeder1spill.user], function(err, results, fields){
										if ( err ) throw err;
										//get the user details
										var contact = {
											full_name: results[0].full_name,
											phone: results[0].phone,
											code: results[0].code
										}
											//enter it into the order table
										db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? )', [pin1, 'ADMINISTRATOR', username, 'Admin', 'The account Name', 'ACCESS', '1234567890', 'pending', 'admin fee', 234, 8061179366], function( err, results, fields ){
											if( err ) throw err;
											db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? ) ', [pin1, contact.full_name, username, feeder1spill.user, bank.account_name, bank.bank, bank.account_number, 'pending', 'matrix', contact.code, contact.phone], function( err, results, fields ){
												if( err ) throw err
												res.redirect('dashboard');
											});
										});
									});
								});
							});
						});
					});
				}
				else{
					db.query('SELECT node.user, node.a, node.b, node.c, status, (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 1 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user AND status = ? HAVING depth > 0 ORDER BY depth', [user, 'confirmed'], function(err, results, fields){
						if (err) throw err;
						if (results.length === 0){
							//check the two
							db.query('SELECT node.user, node.a, node.b, node.c, status, (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user AND status = ? HAVING depth > 0 ORDER BY depth', [user, 'confirmed'], function(err, results, fields){
								if (err) throw err;
								if (results.length === 0){
									//no one to collect for now 
									var error = 'We are very sorry, there is actually no one qualified to receive in your  tree... please check back later';
									res.render('status', {error: error});
								}else{
									//variables for two
									var feeder3spill = {
										a: results[0].a,
										b: results[0].b,
										c: results[0].c,
										user: results[0].user,
										depth: results[0].depth,
										amount: results[0].amount
									}
									//check if the a is null...
									if (feeder3spill.depth === feederdepth && feeder3spill.a === null){
										//get the stuffs to do
										db.query('UPDATE feeder SET a = ? WHERE user = ?', [username, feeder3spill.user], function(err, results, fields){
											if(err) throw err;
											//call the procedure for adding
											//get a unique pin
											securePin.generatePin(5, function(pin){
												var pin1 = pin;
												db.query('CALL leafadd(?,?,?)', [feeder3spill.user, pin1, username], function(err, results, fields){
													if (err) throw err;
													//get the account details of the user
													db.query('SELECT * FROM profile WHERE user = ?', [feeder3spill.user], function(err, results, fields){
														if ( err ) throw err;
														var bank = {
															bank: results[0].bank,
															account_name: results[0].account_name,
															account_number: results[0].account_number
														}
														//get the phone number of the user
														db.query('SELECT full_name, phone, code FROM user WHERE username = ?', [feeder3spill.user], function(err, results, fields){
															if ( err ) throw err;
															//get the user details
															var contact = {
																full_name: results[0].full_name,
																phone: results[0].phone,
																code: results[0].code
															}
															//enter it into the order table
															db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? )', [pin1, 'ADMINISTRATOR', username, 'Admin', 'The account Name', 'ACCESS', '1234567890', 'pending', 'admin fee', 234, 8061179366], function( err, results, fields ){
																if( err ) throw err;
																db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? ) ', [pin1, contact.full_name, username, feeder3spill.user, bank.account_name, bank.bank, bank.account_number, 'pending', 'matrix', contact.code, contact.phone], function( err, results, fields ){
																	if( err ) throw err
																	res.redirect('dashboard');
																});
															});
														});
													});
												});
											});
										});
									}
									else if(feeder3spill.depth === feederdepth && feeder3spill.a !== null && feeder3spill.b === null){
										//get the stuffs to do
										db.query('UPDATE feeder SET b = ? WHERE user = ?', [username, feeder3spill.user], function(err, results, fields){
											if(err) throw err;
											//call the procedure for adding
											db.query('CALL leafadd(?,?,?)', [feeder3spill.user, pin1, username], function(err, results, fields){
												if (err) throw err;
												//check for the sponsor of the boss which is user.
												db.query('SELECT sponsor FROM user WHERE username = ?', [feeder3spill.user], function(err, results, fields){
													if ( err ) throw err;
													var spon = results[0].sponsor;
													//check if the sponsor has a valid matrix.
													db.query('SELECT a, b, c FROM feeder WHERE user = ?', [spon], function(err, results, fields){
														if( err ) throw err;
														if(results.length === 0){
															var sponinherit = 'miracle0403';
															//rest of the matrix
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
																	db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? )', [pin1, 'ADMINISTRATOR', username, 'Admin', 'The account Name', 'ACCESS', '1234567890', 'pending', 'admin fee', 234, 8061179366], function( err, results, fields ){
																		if( err ) throw err;
																		db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? ) ', [pin1, contact.full_name, username, feeder3spill.user, bank.account_name, bank.bank, bank.account_number, 'pending', 'matrix', contact.code, contact.phone], function( err, results, fields ){
																			if( err ) throw err
																			res.redirect('dashboard');
																		});
																	});
																});
															});
														}else{
															//get the variables for the sponinherit
															
															var last = results.slice(-1)[0];
															var use  = {
																a: last.a,
																b: last.b,
																c: last.c
															}
															if (use.a === null || use.b === null || use.c === null){
																//what to do... rest of the matrix.
																var sponinherit = spon;
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
																		db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? )', [pin1, 'ADMINISTRATOR', username, 'Admin', 'The account Name', 'ACCESS', '1234567890', 'pending', 'admin fee', 234, 8061179366], function( err, results, fields ){
																			if( err ) throw err;
																			db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? ) ', [pin1, contact.full_name, username, feeder3spill.user, bank.account_name, bank.bank, bank.account_number, 'pending', 'matrix', contact.code, contact.phone], function( err, results, fields ){
																				if( err ) throw err
																				res.redirect('dashboard');
																			});
																		});
																	});
																});
															}else{
																//take back to the admin.
																var sponinherit = 'miracle0403';
																//rest of the matrix
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
																		db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? )', [pin1, 'ADMINISTRATOR', username, 'Admin', 'The account Name', 'ACCESS', '1234567890', 'pending', 'admin fee', 234, 8061179366], function( err, results, fields ){
																			if( err ) throw err;
																			db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? ) ', [pin1, contact.full_name, username, feeder3spill.user, bank.account_name, bank.bank, bank.account_number, 'pending', 'matrix', contact.code, contact.phone], function( err, results, fields ){
																				if( err ) throw err
																				res.redirect('dashboard');
																			});
																		});
																	});
																});
															}
														}
													});
												});
											});
										});
									}
									else if(feeder3spill.depth === feederdepth && feeder3spill.a !== null && feeder3spill.b !== null && feeder3spill.c === null){
										//get the stuffs to do
										db.query('UPDATE feeder SET c = ? WHERE user = ?', [username, feeder3spill.user], function(err, results, fields){
											if(err) throw err;
											//call the procedure for adding
											//get a unique pin
											securePin.generatePin(5, function(pin){
												var pin1 = pin;
												db.query('CALL leafadd(?,?,?)', [feeder3spill.user, pin1, username], function(err, results, fields){
													if (err) throw err;
													//get the account details of the user
													db.query('SELECT * FROM profile WHERE user = ?', [feeder3spill.user], function(err, results, fields){
														if ( err ) throw err;
														var bank = {
															bank: results[0].bank,
															account_name: results[0].account_name,
															account_number: results[0].account_number
														}
														//get the phone number of the user
														db.query('SELECT full_name, phone, code FROM user WHERE username = ?', [feeder3spill.user], function(err, results, fields){
															if ( err ) throw err;
															//get the user details
															var contact = {
																full_name: results[0].full_name,
																phone: results[0].phone,
																code: results[0].code
															}
																//enter it into the order table
															db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? )', [pin1, 'ADMINISTRATOR', username, 'Admin', 'The account Name', 'ACCESS', '1234567890', 'pending', 'admin fee', 234, 8061179366], function( err, results, fields ){
																if( err ) throw err;
																db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? ) ', [pin1, contact.full_name, username, feeder3spill.user, bank.account_name, bank.bank, bank.account_number, 'pending', 'matrix', contact.code, contact.phone], function( err, results, fields ){
																	if( err ) throw err
																	res.redirect('dashboard');
																});
															});
														});
													});
												});
											});
										});
									}
								}
							});
						}
						else{
							//variables for one
							var feeder2spill = {
								a: results[0].a,
								b: results[0].b,
								c: results[0].c,
								user: results[0].user,
								depth: results[0].depth,
								amount: results[0].amount
							}
							//check if the a is null...
							if (feeder2spill.depth === feederdepth && feeder2spill.a === null){
								//get the stuffs to do
								db.query('UPDATE feeder SET a = ? WHERE user = ?', [username, feeder2spill.user], function(err, results, fields){
									if(err) throw err;
									//call the procedure for adding
									//get a unique pin
									securePin.generatePin(5, function(pin){
										var pin1 = pin;
										db.query('CALL leafadd(?,?,?)', [feeder2spill.user, pin1, username], function(err, results, fields){
											if (err) throw err;
											//get the account details of the user
											db.query('SELECT * FROM profile WHERE user = ?', [feeder2spill.user], function(err, results, fields){
												if ( err ) throw err;
												var bank = {
													bank: results[0].bank,
													account_name: results[0].account_name,
													account_number: results[0].account_number
												}
												//get the phone number of the user
												db.query('SELECT full_name, phone, code FROM user WHERE username = ?', [feeder2spill.user], function(err, results, fields){
													if ( err ) throw err;
													//get the user details
													var contact = {
														full_name: results[0].full_name,
														phone: results[0].phone,
														code: results[0].code
													}
													//enter it into the order table
													db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? )', [pin1, 'ADMINISTRATOR', username, 'Admin', 'The account Name', 'ACCESS', '1234567890', 'pending', 'admin fee', 234, 8061179366], function( err, results, fields ){
														if( err ) throw err;
														db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? ) ', [pin1, contact.full_name, username, feeder2spill.user, bank.account_name, bank.bank, bank.account_number, 'pending', 'matrix', contact.code, contact.phone], function( err, results, fields ){
															if( err ) throw err
															res.redirect('dashboard');
														});
													});
												});
											});
										});
									});
								});
							}
							else if(feeder2spill.depth === feederdepth && feeder2spill.a !== null && feeder2spill.b === null){
								//get the stuffs to do
								db.query('UPDATE feeder SET b = ? WHERE user = ?', [username, feeder2spill.user], function(err, results, fields){
									if(err) throw err;
									//call the procedure for adding
									db.query('CALL leafadd(?,?,?)', [feeder2spill.user, pin1, username], function(err, results, fields){
										if (err) throw err;
										//check for the sponsor of the boss which is user.
										db.query('SELECT sponsor FROM user WHERE username = ?', [feeder2spill.user], function(err, results, fields){
											if ( err ) throw err;
											var spon = results[0].sponsor;
											//check if the sponsor has a valid matrix.
											db.query('SELECT a, b, c FROM feeder WHERE user = ?', [spon], function(err, results, fields){
												if( err ) throw err;
												if(results.length === 0){
													var sponinherit = 'miracle0403';
													//rest of the matrix
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
															db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? )', [pin1, 'ADMINISTRATOR', username, 'Admin', 'The account Name', 'ACCESS', '1234567890', 'pending', 'admin fee', 234, 8061179366], function( err, results, fields ){
																if( err ) throw err;
																db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? ) ', [pin1, contact.full_name, username, feeder2spill.user, bank.account_name, bank.bank, bank.account_number, 'pending', 'matrix', contact.code, contact.phone], function( err, results, fields ){
																	if( err ) throw err
																	res.redirect('dashboard');
																});
															});
														});
													});
												}else{
													//get the variables for the sponinherit
													
													var last = results.slice(-1)[0];
													var use  = {
														a: last.a,
														b: last.b,
														c: last.c
													}
													if (use.a === null || use.b === null || use.c === null){
														//what to do... rest of the matrix.
														var sponinherit = spon;
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
																db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? )', [pin1, 'ADMINISTRATOR', username, 'Admin', 'The account Name', 'ACCESS', '1234567890', 'pending', 'admin fee', 234, 8061179366], function( err, results, fields ){
																	if( err ) throw err;
																	db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? ) ', [pin1, contact.full_name, username, feeder2spill.user, bank.account_name, bank.bank, bank.account_number, 'pending', 'matrix', contact.code, contact.phone], function( err, results, fields ){
																		if( err ) throw err
																		res.redirect('dashboard');
																	});
																});
															});
														});
													}else{
														//take back to the admin.
														var sponinherit = 'miracle0403';
														//rest of the matrix
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
																db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? )', [pin1, 'ADMINISTRATOR', username, 'Admin', 'The account Name', 'ACCESS', '1234567890', 'pending', 'admin fee', 234, 8061179366], function( err, results, fields ){
																	if( err ) throw err;
																	db.query('INSERT INTO orders (order_id, fullname, payer, receiver, accountName, bank, accountNumber, status, purpose,code, phone) VALUES( ?,?,?,?,?,?,?,?,?,?,? ) ', [pin1, contact.full_name, username, feeder2spill.user, bank.account_name, bank.bank, bank.account_number, 'pending', 'matrix', contact.code, contact.phone], function( err, results, fields ){
																		if( err ) throw err
																		res.redirect('dashboard');
																	});
																});
															});
														});
													}
												}
											});
										});
									});
								});
							}
						}
					});
				}
			}
		});
	});
}
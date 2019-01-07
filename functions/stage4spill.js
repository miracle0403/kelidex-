var db = require( '../db.js' );
//var stage4func = require( './stage4.js' );
exports.stage4spill = function stage2spill(x, y, z){
	db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage4 AS node, stage4 AS parent, stage4 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage4 AS node, stage4 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount < 4 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [y], function(err, results, fields){
		if( err ) throw err;
		var stage4depth = results[0].depth;
		db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage4 AS node, stage4 AS parent, stage4 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage4 AS node, stage4 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 0 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [y], function(err, results, fields){
			if( err ) throw err;
			var stage41spill = {
				user: results[0].user,
				depth: results[0].depth,
				amount: results[0].amount
			}
			if (stage41spill.depth === stage4depth){
				//update into the sponsor set
				db.query('UPDATE stage4_tree SET a = ? WHERE user = ?', [x, stage41spill.user], function(err, results, fields){
					if(err) throw err;
					//call the procedure for adding
					db.query('CALL stage4try(?,?,?)', [y, stage41spill.user, x], function(err, results, fields){
						if (err) throw err;
						res.render('register', {title: 'Successful Entrance'});
					});
				});																
			}
			if (stage41spill.depth !== stage4depth){
				db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage4 AS node, stage4 AS parent, stage4 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage4 AS node, stage4 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 1 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [y], function(err, results, fields){
					if( err ) throw err;
					var stage42spill = {
						user: results[0].user,
						depth: results[0].depth,
						amount: results[0].amount
					}
					if (stage42spill.depth === stage4depth){
				//update into the sponsor set
						db.query('UPDATE stage4_tree SET b = ? WHERE user = ?', [x, stage42spill.user], function(err, results, fields){
							if(err) throw err;
					//call the procedure for adding
							db.query('CALL stage4try(?,?,?)', [y, stage42spill.user, x], function(err, results, fields){
								if (err) throw err;
								res.render('register', {title: 'Successful Entrance'});
							});
						});											
					}
					if (stage42spill.depth !== stage4depth){
						db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage4 AS node, stage4 AS parent, stage4 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage4 AS node, stage4 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [y], function(err, results, fields){
							if( err ) throw err;
							var stage43spill = {
								user: results[0].user,
								depth: results[0].depth,
								amount: results[0].amount
							}
							if (stage43spill.depth === stage4depth){
				//update into the sponsor set
								db.query('UPDATE stage4_tree SET c = ? WHERE user = ?', [x, stage43spill.user], function(err, results, fields){
									if(err) throw err;
					//call the procedure for adding
									db.query('CALL stage4try(?,?,?)', [y, stage43spill.user, x], function(err, results, fields){
										if (err) throw err;
										res.render('register', {title: 'Successful Entrance'});
									});
								});											
							}
							if (stage43spill.depth !== stage4depth){
								db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage4 AS node, stage4 AS parent, stage4 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage4 AS node, stage4 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [y], function(err, results, fields){
									if( err ) throw err;
									var stage44spill = {
										user: results[0].user,
										depth: results[0].depth,
										amount: results[0].amount
									}
									if (stage44spill.depth === stage4depth){
				//update into the sponsor set
										db.query('UPDATE stage4_tree SET d = ? WHERE user = ?', [x, stage44spill.user], function(err, results, fields){
											if(err) throw err;
					//call the procedure for adding
												db.query('CALL stage4try(?,?,?)', [y, stage44spill.user, x], function(err, results, fields){
													if (err) throw err;
													db.query('CALL stage4Amount(?)', [y], function(err, results, fields){
														if (err) throw err;
														//end of matrix
												});
											});
										});											
									}
								});
							}
						});
					}
				});
			}
		});
	});
}
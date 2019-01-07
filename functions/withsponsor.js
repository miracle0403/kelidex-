var db = require( '../db.js' );
exports.fillup = function fillup( x ){
	db.query( 'SELECT  parent.user FROM stage1 AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? ORDER BY parent.lft',[x], function ( err, results, fields ){
		if( err ) throw err;
		var oya = results.slice( -3)[0];
		var oyana = oya.user;
		console.log( 'oyana is ' + oyana)
		//the parent of s1.user is gotten up... get their downlines.
		db.query( 'SELECT a, b, c, d, user from stage1_tree WHERE user  = ?',[oyana], function ( err, results, fields ){
			if( err ) throw err;
			var firstfillup = {
				a: results[0].a,
				b: results[0].b,
				c: results[0].c,
				d: results[0].d,
				user: results[0].user
			}
			//get firstfillup.a
			db.query( 'SELECT a, b, c, d, user from stage1_tree WHERE user  = ?',[firstfillup.a], function ( err, results, fields ){
				if( err ) throw err;
				var afill = {
					a: results[0].a,
					b: results[0].b,
					c: results[0].c,
					d: results[0].d,
					user: results[0].user
				}
				//update firstfill.a
				db.query( 'UPDATE stage1_tree SET aa  = ?, ab = ?, ac = ?, ad  = ? WHERE user  = ?', [afill.a, afill.b, afill.c, afill.d, oyana], function ( err, results, fields ){
					if ( err ) throw err;
				});
			});
			if( firstfillup.b === null ){
				console.log( 'b is null' );
			}else{
				//get results for firstfillup.b
				db.query( 'SELECT a, b, c, d, user from stage1_tree WHERE user  = ?',[firstfillup.b], function ( err, results, fields ){
					if( err ) throw err;
			
					var bfill = {
						a: results[0].a,
						b: results[0].b,
						c: results[0].c,
						d: results[0].d,
						user: results[0].user
					}
					//update firstfill.b
					db.query( 'UPDATE stage1_tree SET ba  = ?, bb = ?, bc = ?, bd  = ? WHERE user  = ?', [bfill.a, bfill.b, bfill.c, bfill.d, oyana], function ( err, results, fields ){
						if ( err ) throw err;	
					});
				});
			}
			if( firstfillup.c === null ){
				console.log( 'c is null' );
			}else{
				//get results for firstfillup.b
				db.query( 'SELECT a, b, c, d, user from stage1_tree WHERE user  = ?',[firstfillup.c], function ( err, results, fields ){
					if( err ) throw err;
			
					var cfill = {
						a: results[0].a,
						b: results[0].b,
						c: results[0].c,
						d: results[0].d,
						user: results[0].user
					}
					//update firstfill.b
					db.query( 'UPDATE stage1_tree SET ca  = ?, cb = ?, cc = ?, dd  = ? WHERE user  = ?', [cfill.a, cfill.b, cfill.c, cfill.d, oyana], function ( err, results, fields ){
						if ( err ) throw err;	
					});
				});
			}
			if( firstfillup.d === null ){
				console.log( 'd is null' );
			}else{
				//get results for firstfillup.b
				db.query( 'SELECT a, b, c, d, user from stage1_tree WHERE user  = ?',[firstfillup.d], function ( err, results, fields ){
					if( err ) throw err;
			
					var dfill = {
						a: results[0].a,
						b: results[0].b,
						c: results[0].c,
						d: results[0].d,
						user: results[0].user
					}
					//update firstfill.b
					db.query( 'UPDATE stage1_tree SET da  = ?, db = ?, dc = ?, dd  = ? WHERE user  = ?', [dfill.a, dfill.b, dfill.c, dfill.d, oyana], function ( err, results, fields ){
						if ( err ) throw err;	
					});
				});
			}
		});
	});
}
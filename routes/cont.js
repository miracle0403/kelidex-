    //update the user in the user lft... sign of seriousness...
  db.query( 'SELECT lft, rgt FROM user_tree WHERE user_id  = ?', [currentUser], function ( err, results, fields ){
  	if( err ) throw err;
  	if( results.length === null ){
  		db.query( 'SELECT sponsor FROM user WHERE user_id = ?', [currentUser], function ( err, results, fields ){
  			if ( err ) throw err;
  			var spo = results[0].sponsor;
  			console.log( 'spo is ' + spo);
  			res.render( 'dashboard' )
  		});
  	}
  });
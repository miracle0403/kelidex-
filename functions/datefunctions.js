/*var db  = require( '../db.js' );
//function for reset password
function reset(){
	db.query( 'SELECT date FROM reset WHERE status = ?' , ['active'], function ( err, results, fields ){
		if( err ) throw err;
		if( results.length === 0 ){
			//console.log( 'no date value' );
		}
		else{
			var i = 0;
			while ( i> results.length  ){
				var dt = results[i].date;
				var min  = new Date().getMinutes();
				var year  = new Date().getFullYear();
				var month  = new Date().getMonth();
				var date  = new Date().getDate();
				var hour  = new Date().getHours();
				var calmin  = dt.setMinutes( dt.getMinutes() + 15);
				var calhour = dt.setHours( dt.getHours() + 0);
				var caldate  = dt.setDate( dt.getDate() + 0);
				var calyear  = dt.setFullYear( dt.getFullYear() + 0);
				var calmonth = dt.setMonth( dt.getMonth() + 0);
				if( calmin >=  min){
					db.query( 'UPDATE reset SET status  = ? WHERE date = ?', ['expired', dt], function ( err, results, fields){
					if( err ) throw err;
					});
				}
				if( calmin < min && calhour > hour ){
					db.query( 'UPDATE reset SET status  = ? WHERE date = ?', ['expired', dt], function ( err, results, fields){
						if( err ) throw err;
					});
				}//end of if
				 if(calmin < min && calhour < hour && caldate > date){
				 	db.query( 'UPDATE reset SET status  = ? WHERE date = ?', ['expired', dt], function ( err, results, fields){
				 		if( err ) throw err;
				 	});
				 }
				 if(calmin < min && calhour < hour && caldate < date && calmonth > month){
				 	db.query( 'UPDATE reset SET status  = ? WHERE date = ?', ['expired', dt], function ( err, results, fields){
				 		if( err ) throw err;
				 	});
				 }
				 if(calmin < min && calhour < hour && caldate < date && calmonth < month && calyear > year){
				 	db.query( 'UPDATE reset SET status  = ? WHERE date = ?', ['expired', dt], function ( err, results, fields){
				 		if( err ) throw err;
				 	});
				 }
				 i++;
			}
		}
	});
}
setInterval(reset, 500);

//get the time for the matrix removal.
function firstremove(){
	db.query( 'SELECT order_id, date FROM orders WHERE status = ?' , ['pending'], function ( err, results, fields ){
		if( err ) throw err;
		if( results.length === 0 ){
			//console.log( 'no date value' );
		}else{
			var order_id = results[0].order_id;
			var i = 0;
			while ( i> results.length  ){
				var dt = results[i].date;
				var min  = new Date().getMinutes();
				var year  = new Date().getFullYear();
				var month  = new Date().getMonth();
				var date  = new Date().getDate();
				var hour  = new Date().getHours();
				var calmin  = dt.setMinutes( dt.getMinutes() + 45);
				var calhour = dt.setHours( dt.getHours() + 0);
				var caldate  = dt.setDate( dt.getDate() + 0);
				var calyear  = dt.setFullYear( dt.getFullYear() + 0);
				var calmonth = dt.setMonth( dt.getMonth() + 0);
				if( calmin >=  min){
					db.query( 'DELETE FROM order WHERE date = ?', [dt], function ( err, results, fields){
						if( err ) throw err;
						//check the order id from the feeder matrix.
						db.query( 'SELECT user, order_id FROM feeder WHERE order_id = ?' , [order_id], function ( err, results, fields ){
							if( err ) throw err;
							if (results.length === 1){
								//delete from the feeder with a called procedure.
							}
						});
					});
				}
				if( calmin < min && calhour > hour ){
					db.query( 'DELETE FROM order WHERE date = ?', [dt], function ( err, results, fields){
						if( err ) throw err;
						//check the order id from the feeder matrix.
						db.query( 'SELECT user, order_id FROM feeder WHERE order_id = ?' , [order_id], function ( err, results, fields ){
							if( err ) throw err;
							if (results.length === 1){
								//delete from the feeder with a called procedure.
							}
						});
					});
				}//end of if
				 if(calmin < min && calhour < hour && caldate > date){
				 	db.query( 'DELETE FROM order WHERE date = ?', [dt], function ( err, results, fields){
						if( err ) throw err;
						//check the order id from the feeder matrix.
						db.query( 'SELECT user, order_id FROM feeder WHERE order_id = ?' , [order_id], function ( err, results, fields ){
							if( err ) throw err;
							if (results.length === 1){
								//delete from the feeder with a called procedure.
							}
						});
					});
				 }
				 if(calmin < min && calhour < hour && caldate < date && calmonth > month){
				 	db.query( 'DELETE FROM order WHERE date = ?', [dt], function ( err, results, fields){
						if( err ) throw err;
						//check the order id from the feeder matrix.
						db.query( 'SELECT user, order_id FROM feeder WHERE order_id = ?' , [order_id], function ( err, results, fields ){
							if( err ) throw err;
							if (results.length === 1){
								//delete from the feeder with a called procedure.
							}
						});
					});
				 }
				 if(calmin < min && calhour < hour && caldate < date && calmonth < month && calyear > year){
				 	db.query( 'DELETE FROM order WHERE date = ?', [dt], function ( err, results, fields){
						if( err ) throw err;
						//check the order id from the feeder matrix.
						db.query( 'SELECT user, order_id FROM feeder WHERE order_id = ?' , [order_id], function ( err, results, fields ){
							if( err ) throw err;
							if (results.length === 1){
								//delete from the feeder with a called procedure.
							}
						});
					});
				 }
				 i++;
			}
		}
	});
}
setInterval(firstremove, 500);*/
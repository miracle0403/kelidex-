exports.count = function count( ){
	var countDown= new Date("Nov  14,  2018 10:00:00").getTime(  );
	var now = new Date().getTime(  );
	var distance = countDown - now;
	var days = Math.floor(distance /(1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  	var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	if( distance > 0 ){
		var error  = 'We are yet to launch... try again';
		res.redirect( 'dashboard' )
	}
}
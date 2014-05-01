exports.checkoutpage=function(req,res){
	var mysql      = require('mysql');
	var pool = mysql.createPool({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'shinchan',
	  port: '3306',
	  database: 'amazonmarket'});
	pool.getConnection(function(err,connection){
	
	var email=req.session.email;
	var sql1="select first_name,last_name from user where email=?";
	connection.query(sql1,[email],function(err,rows,field){
		var firstname=rows[0].first_name;
		var lastname=rows[0].last_name;
		connection.release();
	res.render('checkoutvalidate',{fn:firstname,ln:lastname});
	});
	});
}

exports.loginpage=function(req,res){
	res.render('login');
}

exports.validatelogin=function(req,res){
	var mysql      = require('mysql');
	var crypto=require('crypto');
	var pool = mysql.createPool({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'shinchan',
	  port: '3306',
	  database: 'amazonmarket'});
	pool.getConnection(function(err,connection){
		var dat = new Date();
		var dd = dat.getDate();
		var mm = dat.getMonth();
		var yy = dat.getFullYear();
		var hh = dat.getHours();
		var mmm = dat.getMinutes();
		var ss = dat.getSeconds();
		var today = yy +"-"+mm+"-"+dd+" "+hh+":"+mmm+":"+ss;
		var sq = 'update user set last_login = (?) where email = (?)'
			connection.query(sq, [today, email] , function(err, rows, fields){
			if(err){
				console.log("time error");
				res.render('login', {response: "password mismatch"});
				console.log("ERROR:" +err.message)
			}
			});
		
	
	var email = req.body.email.toString();
	var password=crypto.createHash('sha256').update(req.body.password.toString()).digest('hex');
	var sql='select first_name,last_name,email,password,last_login from user where email= ? and password=?';
	connection.query(sql, [email,password],function(err,rows,fields){
		if(rows.length!=0){
			req.session.email=email;
			firstname=rows[0].first_name;
			lastname=rows[0].last_name;
			last=rows[0].last_login;
			
			
			connection.release();
			res.render('homepage', {fn:firstname,ln:lastname,log:last});                   
		}
		else  {
			connection.release();
			res.render('login',{err: 'Invalid Email or Password'});  
			  }
	});   
	});
}
exports.signuppage=function(req,res){
	res.render('signup');
}

exports.signupvalidate=function(req,res){
	
	var mysql      = require('mysql');
	var crypto =require('crypto');
	var pool = mysql.createPool({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'shinchan',
	  port: '3306',
	  database: 'amazonmarket'});
	pool.getConnection(function(err,connection){
		  
		 var firstname=req.body.firstname.toString();
		 var lastname=req.body.lastname.toString();
		 var email=req.body.email.toString();
		 var password = crypto.createHash('sha256').update(req.body.password.toString()).digest('hex');
		 
		 
		 req.assert("firstname", 'Firstname cannot be empty.').notEmpty();
		 req.assert("lastname", 'Lastname cannot be empty.').notEmpty();
		 req.assert("email", 'Email cannot be empty.').notEmpty();
		 req.assert("email", 'Invalid email address.').isEmail();
         req.assert("password", 'Password cannot be empty.').notEmpty();
        
		 var errors=req.validationErrors();
		 if(errors)
			 {
			 connection.release();
			 	res.render('signup',{err:errors}); 
			 }
		 else{
		 
			 var sql = 'select email from user where email=?';
			 connection.query(sql, [email],function(err,rows,fields){
			if(rows.length!=0){
				connection.release();
					res.render('signup',{error: 'User already exists'}); 
			}
			else{
				var sql1= 'insert into user (first_name,last_name,email,password) values (?,?,?,?) ';
				connection.query(sql1, [firstname,lastname,email,password],function(err, results) {
				if (err) 
		            console.log("ERROR: " + err.message);
				else{
					req.session.email=email;
					//global.session=req.session;
					connection.release();
					res.render('homepage', {fn:firstname,ln:lastname});  
				}
		  	 });
		 }
		  
			 });
		 }
	});
}
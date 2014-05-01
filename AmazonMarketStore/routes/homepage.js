exports.homepage=function(req,res){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'shinchan',
	  port: '3306',
	  database: 'amazonmarket'});
	connection.connect();
	
	var email=req.session.email;
	var sql1="select first_name,last_name from user where email=?";
	connection.query(sql1,[email],function(err,rows,field){
		var firstname=rows[0].first_name;
		var lastname=rows[0].last_name;
		
		
		
	
	var sql="select product_name,description,price,quantity from product p, category c where p.cat_id=c.cat_id and cat_name='Sporting goods' ";
	connection.query(sql,function(er,rows,fields){   
		if(rows.length!=0){  
			
			res.render('homepage',{fn:firstname,ln:lastname});  
		} 
	});     
	});
	
	
}
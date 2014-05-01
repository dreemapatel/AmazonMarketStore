exports.electronicpage=function(req,res){
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
		 
		
	
	var sql="select product_id, product_name,description,price,quantity from product p, category c where p.cat_id=c.cat_id and cat_name="+mysql.escape("Electronics");
	connection.query(sql,function(er,rows,fields){   
		if(rows.length!=0){  
			connection.release();
			res.render('electronics',{fn:firstname,ln:lastname,detail1:rows[0],detail2:rows[1],detail3:rows[2],detail4:rows[3] });  
		} 
	});     
	});
	
	});
}   

exports.sportspage=function(req,res){
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
		
		
		
	
	var sql="select product_id,product_name,description,price,quantity from product p, category c where p.cat_id=c.cat_id and cat_name="+mysql.escape("Sporting goods");
	connection.query(sql,function(er,rows,fields){   
		if(rows.length!=0){  
			connection.release();
			res.render('sports',{fn:firstname,ln:lastname,detail1:rows[0],detail2:rows[1]});  
		} 
	});     
	});
	
	});
}   

exports.bookspage=function(req,res){
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
		
		
		
	
	var sql="select product_id,product_name,description,price,quantity from product p, category c where p.cat_id=c.cat_id and cat_name="+mysql.escape("Books") ;
	connection.query(sql,function(er,rows,fields){   
		if(rows.length!=0){  
			connection.release();
			res.render('books',{fn:firstname,ln:lastname,detail1:rows[0],detail2:rows[1],detail3:rows[2]});  
		} 
	});        
	});
	});

}      


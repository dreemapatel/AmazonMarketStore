exports.show=function(req,res){
	//var pid=req.param('pid');
	var mysql      = require('mysql');
	var pool = mysql.createPool({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'shinchan',
	  port: '3306',
	  database: 'amazonmarket'});
	pool.getConnection(function(err,connection){
	
	var email=req.session.email;
	var sql1="select uid,first_name,last_name from user where email=?";
	connection.query(sql1,[email],function(err,rows,field){
		var firstname=rows[0].first_name;
		var lastname=rows[0].last_name;
		var uid=rows[0].uid;
		
		//var quantity=req.body.quantity;
		//var pid=req.body.pid;
		//console.log(pid);
		//console.log(quantity);
		
			
			
	//var sql2="insert into cart values(?,?,?)";
	
			
	    var sql="select p.product_id,product_name,cat_name,description,price,qty from product p,purchase pu,category ca where p.product_id=pu.product_id and p.cat_id=ca.cat_id and uid="+mysql.escape(uid);
	connection.query(sql,function(error,rows,fields){   
		if(rows.length!=0){
			//console.log(rows );
			connection.release();
			 res.render('showpurchase',{fn:firstname,ln:lastname,details:rows}); 
		}
		else
			{
				res.render('showpurchase',{fn:firstname,ln:lastname, msg:"No purchases yet"});
			}
		
		
			
			
		
	    
		});
	    
	});
	});
	
	

}
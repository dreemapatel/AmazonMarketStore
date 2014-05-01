exports.removeitem=function(req,res){
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
		
		var prod_id=req.param('pid').toString();
		console.log(req.param('pid'));
		console.log(uid);
		console.log(firstname);
		
		var sql="delete from cart where product_id = ? and uid = ?";
		connection.query(sql,[prod_id,uid],function(err,rows,fields){
			if(err){
			console.log("gud");}
			
			console.log("deleted");
		});
		 var sql2="select p.product_id,product_name,cat_name,description,price,quant from product p,cart c,category ca where p.product_id=c.product_id and p.cat_id=ca.cat_id and uid="+mysql.escape(uid);
		 
			connection.query(sql2,function(error,rows,fields){   
				if(rows.length!=0){  
					var total=0;
					for(var i=0;i<rows.length;i++){
						total=total+rows[i].quant*rows[i].price;
					}
						connection.release();
						 res.render('add-to-cart',{fn:firstname,ln:lastname,details:rows,total:total}); 
					}
				else{
					connection.release();
					 res.render('add-to-cart',{fn:firstname,ln:lastname,empty:"Your Cart is Empty"}); 
					
				}
			    });
	});

});

}
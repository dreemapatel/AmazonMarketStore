exports.submit=function(req,res){
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
	
		var sql2="select * from cart where uid=?"
			
		connection.query(sql2,[uid],function(err,rows,field){
			if(!err){
				for(var i=0;i<rows.length;i++){
					var pid=rows[i].product_id;
					var qty=rows[i].quant;
					var sql3="insert into purchase values(?,?,?)";
					connection.query(sql3,[pid,uid,qty]);
					
				}} });
			
			var sql4="select p.product_id,quantity,qty from product p, purchase pu where p.product_id=pu.product_id";
			connection.query(sql4,function(err,rows,fields){
				var q,sql4,pid;
			
			
					for(var i=0;i<rows.length;i++){
						
						q=rows[i].quantity - rows[i].qty;
						
						pid=rows[i].product_id;
						
						
						sql5="UPDATE product set quantity=? where product_id=?";
						connection.query(sql5,[q,pid]);
					
				}
				
			
		
		var sql='delete from cart where uid=?';
		connection.query(sql,[uid],function(err,rows,field){
			if(err){
				res.send("could not delete");
			}
			else
				{
				connection.release();
				res.render('thankyou',{fn:firstname,ln:lastname});
				}
		});
	

	});
	});
	});
}
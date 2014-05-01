var dat = new Date();
			var dd = dat.getDate();
			var mm = dat.getMonth();
			var yy = dat.getFullYear();
			var hh = dat.getHours();
			var mmm = dat.getMinutes();
			var ss = dat.getSeconds();
			var today = yy +"-"+mm+"-"+dd+" "+hh+":"+mmm+":"+ss;
			var sq = 'update user set last = (?) where email = (?)'
				connection.query(sq, [today, emailhere] , function(err, rows, fields){
				if(err){
					console.log("time error");
					res.render('login', {response: "password mismatch"});
					console.log("ERROR:" +err.message)
				}
				});
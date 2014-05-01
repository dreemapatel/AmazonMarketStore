
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
ejs = require("ejs");
var http = require('http');
var path = require('path');
expressValidator = require('express-validator');
var app = express();
var login=require('./routes/loginpage');
var signup=require('./routes/signuppage');
var home=require('./routes/homepage');
var cat=require('./routes/category')
var cart=require('./routes/cartpage');
var checkout=require('./routes/checkoutpage');
var order=require('./routes/submitorderpage');
var remove=require('./routes/remove');
var purchase=require('./routes/mypurchase');

var title = 'EJS template with Node.JS';
var data = 'Data from node';

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(expressValidator());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: 'something'}));
app.use(app.router);


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/login', login.loginpage);
app.post('/login',login.validatelogin);
app.get('/electronics', cat.electronicpage);
app.get('/sports',cat.sportspage);
app.get('/books',cat.bookspage);
app.post('/add-to-cart',cart.add);

app.get('/mycart',cart.show);
app.post('/submitorder',order.submit);
app.get('/signup',signup.signuppage);
app.post('/signup', signup.signupvalidate);
app.get('/home',home.homepage);
app.get('/', routes.index);
app.get('/users', user.list);
app.post('/checkout',checkout.checkoutpage);
app.get('/mypurchase',purchase.show);
app.get('/removeitem',remove.removeitem);
app.get('/logout', function(req, res){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
	  req.session.destroy(function(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
	    res.redirect('/login');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	  });  
});    
   
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

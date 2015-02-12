var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var app = express();


// routes
var routes = require('./routes/index');
var hadouken = require('./routes/hadouken');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/hadouken-hero', hadouken);


app.use(favicon(__dirname + '/public/images/favicon.ico'));


app.get('/send',function(req,res){
//code to send e-mail.
//Will be shown soon.
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});



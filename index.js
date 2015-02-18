var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var robots = require('robots.txt');

var app = express();


// routes
var routes = require('./routes/index');
var hadouken = require('./routes/hadouken');
var allenRoad = require('./routes/allenRoad');
var ecards = require('./routes/ecards');
var email = require('./routes/email');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/hadouken-hero', hadouken);
app.use('/allen-road', allenRoad);
app.use('/marie-curie-ecards', ecards);
app.use('/email', email);
app.use(robots(__dirname + '/robots.txt'));



app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});



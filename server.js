var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/'));
app.set('views', __dirname +'/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.render('index.html');
});

app.get('/Sandbox/', function(req, res){
  res.redirect('/')
});

app.listen(app.get('port'), function() {
});
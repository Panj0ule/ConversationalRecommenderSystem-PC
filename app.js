var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const neo4j = require('neo4j-driver');

var app = express();
app.use(cookieParser());
//var gpu_model = require('gpu_nba')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// neo4j Driver
const driver = neo4j.driver("bolt://127.0.0.1:7687", neo4j.auth.basic("neo4j", "123456"))
const session = driver.session()

//Import Controller
var gpu_nba = require('./controllers/gpu_nba'); // gpu_nba controller
var cpu_nba = require('./controllers/cpu_nba'); // cpu_nba controller
var ram_nba = require('./controllers/ram_nba'); // ram_nba controller



// Home Route
app.get('/', function(req,res){
  res.render('index')
});


//ROUTES

//about crs route
app.get('/crs', function(req,res){
  res.render('about_crs')
})

//gpu_page route
app.get('/crs/gpu', gpu_nba.gpu_home);
app.post('/crs/gpu/result', gpu_nba.gpu_query_filter);
app.post('/crs/gpu/compare', gpu_nba.gpu_compare);

app.post('/crs/cpu-checkpoint', cpu_nba.cpu_checkpoint);
app.get('/crs/cpu', cpu_nba.cpu_home);
app.post('/crs/cpu/result', cpu_nba.cpu_query_filter);
app.post('/crs/cpu/compare', cpu_nba.cpu_compare);

app.post('/crs/ram-checkpoint', ram_nba.ram_checkpoint);
app.listen(3000);

module.exports = app;
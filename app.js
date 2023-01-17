var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const neo4j = require('neo4j-driver');
var LocalStorage = require('node-localstorage').LocalStorage;

localStorage = new LocalStorage('./scratch');
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
var hdd_nba = require('./controllers/hdd_nba'); // hdd_nba controller
var mobo_nba = require('./controllers/mobo_nba'); // mobo_nba controller
var final = require('./controllers/final'); // final controller



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

app.post('/crs/mobo-checkpoint', mobo_nba.mobo_checkpoint);
app.get('/crs/mobo', mobo_nba.mobo_home);
app.post('/crs/mobo/result', mobo_nba.mobo_query_filter);
app.post('/crs/mobo/compare', mobo_nba.mobo_compare);
app.get('/crs/mobo/nocompatible', mobo_nba.mobo_nocompatible);

app.post('/crs/ram-checkpoint', ram_nba.ram_checkpoint);
app.get('/crs/ram', ram_nba.ram_home);
app.post('/crs/ram/result', ram_nba.ram_query_filter);
app.post('/crs/ram/compare', ram_nba.ram_compare);

app.post('/crs/hdd-checkpoint', hdd_nba.hdd_checkpoint);
app.get('/crs/hdd', hdd_nba.hdd_home);
app.post('/crs/hdd/result', hdd_nba.hdd_query_filter);
app.post('/crs/hdd/compare', hdd_nba.hdd_compare);




app.post('/crs/final', final.final_checkpoint);
app.get('/crs/finish', final.finish_page);
app.listen(3000);

module.exports = app;
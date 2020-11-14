var fs = require('fs-extra');
var http = require('http');
var https = require('https');
const connectionParameters = require("./app/connection");
var express = require('express');
var app = express();


var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var server2 = require('http').createServer(app);


var flash = require('connect-flash');
var validator = require('express-validator');
var exphbs = require('express-handlebars');
var hbs = exphbs.create({
    helpers: {
   iff: function (a, b, options) {
    if (a == b) { return options.fn(this); }
    return options.inverse(this); },
    },
	extname: '.hbs', 
	defaultLayout: 'layout', 
	layoutsDir: __dirname + '/public/views/layouts/', 
	partialsDir: __dirname + '/public/views/partials/' 
});
var router = express.Router();

var session = require('express-session');
var mysql = require('mysql');

var mysqlPool = mysql.createPool({
    host: connectionParameters[0].host,
    user: connectionParameters[0].user, 
    password: connectionParameters[0].password,
    database: 'infosec',
    connectionLimit: 400
});



// view engine setup
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'public'));
expressValidator = require('express-validator');

var fs = require('fs');

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({limit: '10mb', extended: true})); // parse application/x-www-form-urlencoded
app.use(validator());


app.get("/", (req, res) => {					
			res.render('index')
});


    app.get('/locator_search', function (req, res) {
        mysqlPool.getConnection(function (err, db) {
            if (err)
                throw err;
            db.query("Select IFNULL(Type,'') as Type, construction, Year, FullName, ID_Code, pointx, pointy, last_updated, edited_by, edited_date, created_date, notes, linearid, IFNULL(milePost,'') as milePost, city, IFNULL(road_code,'') as road_code, county, rte_number, district, zip_code, id, state, st_number, unit from sna.peel9_locator " +
                "where if(milePost is not null,concat(SUBSTRING_INDEX(fullname,' ',-1),' ',milePost),concat(st_number,' ',fullname,', ',city,', ',state,' ',zip_code)) like '%" + req.query.key + "%' OR FullName like '%" + req.query.key + "%' limit 5", [-84.512016,39.103119],function (err, rows, fields) {
                if (err) {
                    console.log(err)
                } else {
                    res.send(rows);
                }
            });
            db.release();
        });
    });

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

require('./app/routes')(app); // pass our application into our routes
require("express-stream-json");

server2.listen(3000)
console.log('server started'); 			// shoutout to the user
exports = module.exports = app; 						// expose app

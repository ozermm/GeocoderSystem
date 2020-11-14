var connectionParameters = require("./connection");
var mysql = require('mysql');
var bodyParser = require('body-parser');

var path = require("path");

var urlencodedParser = bodyParser.urlencoded({ extended: true });
var express = require('express');
var app = express();
var session = require('express-session');
var server = require('http').createServer(app);
const fs = require('fs');

var mysqlPool = mysql.createPool({
    host: connectionParameters[0].host,
    user: connectionParameters[0].user,
    password: connectionParameters[0].password,
    database: 'infosec',
    connectionLimit: 500
});


module.exports = function (app) {

    var mailOptions = {
        from: '*****',
        to: '*****',
        subject: 'Sending Email using Node.js',
        text: 'Server was down and restarted. Check the error for further details!'
    };

  
        }
		
app.get("/", (req, res) => {					
			res.render("index")
});

    app.get('/peel9_locator_search', function (req, res) {
        mysqlPool3.getConnection(function (err, db) {
            if (err)
                throw err;
            db.query("Select IFNULL(Type,'') as Type, construction, Year, FullName, ID_Code, pointx, pointy, last_updated, edited_by, edited_date, created_date, notes, linearid, IFNULL(milePost,'') as milePost, city, IFNULL(road_code,'') as road_code, county, rte_number, district, zip_code, id, state, st_number, unit from sna.peel9_locator " +
                "where if(milePost is not null,concat(SUBSTRING_INDEX(fullname,' ',-1),' ',milePost),concat(st_number,' ',fullname,', ',city,', ',state,' ',zip_code)) like '%" + req.query.key + "%' OR FullName like '%" + req.query.key + "%' order by ST_Distance_Sphere(point(pointx, pointy),point(?, ?)) asc limit 15", [department.pointx,department.pointy],function (err, rows, fields) {
                if (err) {
                    console.log(err)
                } else {
                    res.send(rows);
                }
            });
            db.release();
        });
    });


    function uniqid(a = "", b = false) {
        var c = Date.now() / 1000;
        var d = c.toString(16).split(".").join("");
        while (d.length < 14) {
            d += "0";
        }
        var e = "";
        if (b) {
            e = ".";
            var f = Math.round(Math.random() * 100000000);
            e += f;
        }
        return a + d + e;
    }

  
    // Sign in & Distributing users to different pages based on their roles ================================

 
 

function isLoggedIn(req, res, next) {               // Express Middleware functions
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

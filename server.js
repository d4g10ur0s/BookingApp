var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors')

var http = require('http');
var util = require('util');
var mysql = require('mysql');
const url = require('url');
var formidable = require('formidable');

//to connection se db
const con = mysql.createConnection({//sundesh se vash
  host: "localhost",
  user: "root",
  password: "Den8aKsexasw",
  database: "bookingproject",
  multipleStatements: true
});

var app = express();


// view engine setup
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'ejs');
app.use(cors());

//book Appointement from db
app.all('/employerLogIn',function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
    }else if(req.method==='POST'){
      var body = [];
      //h katallhlh kefalida
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      //diavase data
      req.on("data", (chunk) => {
        body.push(chunk);
        console.log(body)
      });
      //otan exeis diavasei olo to data
      req.on("end", async () => {
        var mdata = Buffer.concat(body).toString();
        mdata = JSON.parse(mdata);//parsing json

        await con.connect(async function(err) {
          const query = util.promisify(con.query).bind(con);
          tQuery = "select * from user where email like "+
                   "\'" +mdata.email + "\' and password like " +
                   "\'" + mdata.password + "\' ;";
          var query_result = await query(tQuery);

          res.write(JSON.stringify({ap : query_result}));
          res.end();
        });//telos query

      });//telos connect

      res.on('error', (err) => {
        console.error(err);
      });
  }//end if
});

//retrieve Employees of shop from db
app.all('/retrieveEmployees',function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
    }else if(req.method==='POST'){
      var body = [];
      //h katallhlh kefalida
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      //diavase data
      req.on("data", (chunk) => {
        body.push(chunk);
        console.log(body)
      });
      //otan exeis diavasei olo to data
      req.on("end", async () => {
        var mdata = Buffer.concat(body).toString();
        mdata = JSON.parse(mdata);//parsing json

        await con.connect(async function(err) {
          const query = util.promisify(con.query).bind(con);

          tQuery = "select * from user where shopname like \'"+mdata.shopname+"\';";
          var query_result = await query(tQuery);

          res.write(JSON.stringify({ap : query_result}));
          res.end();
        });//telos query

      });//telos connect

      res.on('error', (err) => {
        console.error(err);
      });
  }//end if
});

//delete an Employee of shop from db
app.all('/deleteEmployee',function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
    }else if(req.method==='POST'){
      var body = [];
      //h katallhlh kefalida
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      //diavase data
      req.on("data", (chunk) => {
        body.push(chunk);
        console.log(body)
      });
      //otan exeis diavasei olo to data
      req.on("end", async () => {
        var mdata = Buffer.concat(body).toString();
        mdata = JSON.parse(mdata);//parsing json

        await con.connect(async function(err) {
          const query = util.promisify(con.query).bind(con);

          tQuery = "delete from user where id ="+mdata.emp.id+";";
          var query_result = await query(tQuery);

          tQuery = "delete from employee_service where eid ="+mdata.emp.id+";";
          var query_result = query(tQuery);

          res.write(JSON.stringify({ap : 'success'}));
          res.end();
        });//telos query

      });//telos connect

      res.on('error', (err) => {
        console.error(err);
      });
  }//end if
});

//register an employee from db
app.all('/saveEmployee',function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
    }else if(req.method==='POST'){
      var body = [];
      //h katallhlh kefalida
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      //diavase data
      req.on("data", (chunk) => {
        body.push(chunk);
        console.log(body)
      });
      //otan exeis diavasei olo to data
      req.on("end", async () => {
        var mdata = Buffer.concat(body).toString();
        mdata = JSON.parse(mdata);//parsing json

        await con.connect(async function(err) {
          const query = util.promisify(con.query).bind(con);
          var tQuery = "select * from user where email like "+
                   "\'" +mdata.email + "\' and password like " +
                   "\'" + mdata.password + "\' ;";
          var query_result = await query(tQuery);

          if(query_result.length > 0){
            //edw paizei error
            res.write(JSON.stringify({
              er : 'User Exists'
            }));
            res.end();
          }else{

            tQuery = "insert into user (name,sirname,email,phone,password,employee,shopname) values"+
                     "(\'" +mdata.name + "\', \'" +mdata.sirname +
                     "\', \'" +mdata.email + "\', \'" +mdata.phone +
                     "\', \'" +'  ' + "\', \'" +mdata.type +"\',\'"+
                     mdata.shopname +"\' );";

            var query_result = query(tQuery);

            res.write(JSON.stringify({
              er : null
            }));
            res.end();
          }

        });//telos query

      });//telos connect

      res.on('error', (err) => {
        console.error(err);
      });
  }//end if
});

//save a service from db
app.all('/saveService',function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
    }else if(req.method==='POST'){
      var body = [];
      //h katallhlh kefalida
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      //diavase data
      req.on("data", (chunk) => {
        body.push(chunk);
        console.log(body)
      });
      //otan exeis diavasei olo to data
      req.on("end", async () => {
        var mdata = Buffer.concat(body).toString();
        mdata = JSON.parse(mdata);//parsing json

        await con.connect(async function(err) {
          const query = util.promisify(con.query).bind(con);
          var tQuery = "select t1.* from (select * from service where title like "+
                   "\'" +mdata.service.title + "\' ) as t1 inner join (select * from employee_service where eid = "+
                   mdata.emp.id +") as t2 on t1.id=t2.sid;";

          var query_result = await query(tQuery);

          if(query_result.length > 0){
            //edw paizei error
            res.write(JSON.stringify({
              er : 'Service Exists'
            }));
            res.end();
          }else{

            tQuery = "insert into service (title,cost,user_description,client_description,shop_name) values"+
                     "(\'" +mdata.service.title + "\', \'" +mdata.service.cost +
                     "\', \'" +mdata.service.user_description + "\', \'" +mdata.service.client_description +
                     "\', \'" + mdata.emp.shopname + "\' );";
            var query_result = await query(tQuery);

            tQuery = "select * from service where title like " +"\'" +mdata.service.title
                      + "\' and shop_name like \'" +
                      mdata.emp.shopname + "\';";
            var query_result = await query(tQuery);

            tQuery = "insert into employee_service (sid,eid) values"+
                     "(" +query_result[0].id + ", "+mdata.emp.id +");";
            var query_result = query(tQuery);

            res.write(JSON.stringify({
              er : null
            }));
            res.end();
          }

        });//telos query

      });//telos connect

      res.on('error', (err) => {
        console.error(err);
      });
  }//end if
});

//retrieve Services of shop from db
app.all('/retrieveServices',function (req, res) {
  console.log('Request received: ');
  util.inspect(req) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
  if(req.method==='OPTIONS'){
          res.writeHead(200);
          res.end();
    }else if(req.method==='POST'){
      var body = [];
      //h katallhlh kefalida
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      //diavase data
      req.on("data", (chunk) => {
        body.push(chunk);
        console.log(body)
      });
      //otan exeis diavasei olo to data
      req.on("end", async () => {
        var mdata = Buffer.concat(body).toString();
        mdata = JSON.parse(mdata);//parsing json

        await con.connect(async function(err) {
          const query = util.promisify(con.query).bind(con);

          tQuery = "select * from service where shop_name like \'"+mdata.shopname+"\';";
          var query_result = await query(tQuery);

          res.write(JSON.stringify({ap : query_result}));
          res.end();
        });//telos query

      });//telos connect

      res.on('error', (err) => {
        console.error(err);
      });
  }//end if
});

app.listen(8080, function() {
  console.log('Node app is running on port 8080');
});
module.exports = app;

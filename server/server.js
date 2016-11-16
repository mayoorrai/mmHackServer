// load express package and create app
var express = require('express'),
    app = express(),
    path = require('path'),
    request = require('request');

var calculator = require('./calculator');

// send index.html page to user upon hitting the home page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// start server
app.listen(1337);
console.log('1337 is the port!');  




// create routes for the admin section

// get instance of router
var mainRouter = express.Router();

// mainRouter middleware
mainRouter.use(function(req, res, next) {
    // log every request to console
    console.log(req.method, req.url);
    
    // continue to route
    next();
});

// route middleware to validate 'name'
mainRouter.param('name', function(req, res, next, name) {
    // do validation on the name parameter
    console.log('Doing name validation on... ' + name);
    
    // once validation is done save the new item in the req before passing to req
    req.name = name;
    // go to next thing
    next();
});

// the admin main page. dashboard: (http://localhost:1337/admin)
mainRouter.get('/', function(req, res) {
    console.log("Server is running!!");
    res.send('Sending you your query...');
});

// users page (http://localhost:1337/admin/users)
mainRouter.get('/:asset1/:asset2', function(req, res) {
//    TODO: call timeseries...
    var asset1 = req.params['asset1'];
    var asset2 = req.params['asset2'];
    
    // get timeseries data for both assets...
     var timeseries_query_uri     = 'https://time-series-store-predix.run.aws-usw02-pr.ice.predix.io/v1/datapoints';
    var timeseries_zone_id   = '3bc48f70-1519-4b27-a713-cbeb6e6fc60f';

       var json_data =
           {
            "start" : "1y-ago",
            "tags" : [
                  {
                    "name" : [
                        asset1,
                        asset2
                    ]
                  }
              ]
            };

               // options for db call
               var options = {
                   method: 'POST',
                   url: timeseries_query_uri,
                   headers : {
                         'Accept': 'application/json, application/x-www-form-urlencoded',
                         'Authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiI3Nzg4NTYzYTYyZDM0MzQxYTU2ODg4OGJhMjNiZmE0NiIsInN1YiI6ImhhY2thdGhvblVBQSIsInNjb3BlIjpbInRpbWVzZXJpZXMuem9uZXMuM2JjNDhmNzAtMTUxOS00YjI3LWE3MTMtY2JlYjZlNmZjNjBmLnVzZXIiLCJ0aW1lc2VyaWVzLnpvbmVzLjNiYzQ4ZjcwLTE1MTktNGIyNy1hNzEzLWNiZWI2ZTZmYzYwZi5xdWVyeSIsInVhYS5ub25lIiwidGltZXNlcmllcy56b25lcy4zYmM0OGY3MC0xNTE5LTRiMjctYTcxMy1jYmViNmU2ZmM2MGYuaW5nZXN0Il0sImNsaWVudF9pZCI6ImhhY2thdGhvblVBQSIsImNpZCI6ImhhY2thdGhvblVBQSIsImF6cCI6ImhhY2thdGhvblVBQSIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJyZXZfc2lnIjoiOTQxYTMyZTEiLCJpYXQiOjE0NzkyMzY3ODIsImV4cCI6MTQ3OTI3OTk4MiwiaXNzIjoiaHR0cHM6Ly9mZmE4MDg3Yy02YmVmLTRmODMtOWZmYi01YmU2N2ZjYWMzODgucHJlZGl4LXVhYS5ydW4uYXdzLXVzdzAyLXByLmljZS5wcmVkaXguaW8vb2F1dGgvdG9rZW4iLCJ6aWQiOiJmZmE4MDg3Yy02YmVmLTRmODMtOWZmYi01YmU2N2ZjYWMzODgiLCJhdWQiOlsidGltZXNlcmllcy56b25lcy4zYmM0OGY3MC0xNTE5LTRiMjctYTcxMy1jYmViNmU2ZmM2MGYiLCJoYWNrYXRob25VQUEiXX0.SiYEaMjxt-5AzKOO3tROC2kzFRckzHD21kzJ6Dbw8_WFJwGsjONQ4CyT4iaUEI6WiFDidPemrzA8V_7gylSNqGTz2oy647tT6UwUyPMTocNh_O9IrDerrmDpsrIl_1MzxFQMWqMbRtPopqPCE7I5L1HTxrLq3pjI1bsuhvsLsr_ep8q2fGZiwrJRLnKTRs3a961sYdu5WR353qn7wDmEoalGWYnHO_ei6PrUl-3NED77BtPX4IGQ-mpY0KnYgcX_ju0hhooRaUUi_DZJj770TG2R0A_M6UpzQNxR0wOqcGkUKy1XBAM3lYqA2b0c133QfA8Pja4NPlHQR6wA1zhktw',
                         'Predix-Zone-Id': timeseries_zone_id
                     },
                   json : json_data
               };

               // call to db, if successful, return data as json for client
               request(options, function (error, response, body) {
                   if (!error && response.statusCode == 200) {
                       //console.log(response);
                       
                       // send to calculator function...
                       calculator.calculatePower(body);
                       
                       res.send(body);

                   }
                   else{
                       //console.log(response);
                       res.send(error);
                   }
               });
    
    
});

// apply admin routes to application
app.use('/getBlockData', mainRouter);
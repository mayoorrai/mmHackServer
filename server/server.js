// load express package and create app
var express = require('express'),
    app = express(),
    path = require('path'),
    request = require('request'),
    http = require('http');

var calculator = require('./calculator');
var requestBuilder = require('./requestBuilder');

// send index.html page to user upon hitting the home page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// start server
app.listen(1337);
console.log('1337 is the port!');  


// get instance of router
var allAssetsRouter = express.Router();

allAssetsRouter.use(function(req, res, next) {
    // log every request to console
    console.log(req.method, req.url);
    
    // continue to route
    next();
});

// get all assets and return to client
allAssetsRouter.get('/', function(req, res) {
    console.log("getting all assets...");
    
    var jsonBody = {
                    "start" : "1y-ago",
                    "tags" : [
                                {
                        "name" : [
                            'Gas Engine 1 - TS'
                        ]
                      }
                    ]
                  };
    
    // build request...
    var options = requestBuilder.generateRequestForTimeseries(jsonBody);
   
// call to db, if successful, return data as json for client
   request(options, function (error, response, body) {
       if (!error && response.statusCode == 200) {
           res.send(body);

       }
       else{
           //console.log(response);
           res.send(error);
       }
   });
})

// get instance of router
var mainRouter = express.Router();

// mainRouter middleware
mainRouter.use(function(req, res, next) {
    // log every request to console
    console.log(req.method, req.url);
    
    // continue to route
    next();
});

// the admin main page. dashboard: (http://localhost:1337/admin)
mainRouter.get('/', function(req, res) {
    console.log("getting Block Data...");
});

// users page (http://localhost:1337/admin/users)
mainRouter.get('/:asset1/:asset2', function(req, res) {
    console.log("getting Block Data...");
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
                         'Authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiI2NWVkN2U3NzU4MDc0NDE5OGFmN2U5YTJjZjk1Mzc2ZCIsInN1YiI6ImhhY2thdGhvblVBQSIsInNjb3BlIjpbInRpbWVzZXJpZXMuem9uZXMuM2JjNDhmNzAtMTUxOS00YjI3LWE3MTMtY2JlYjZlNmZjNjBmLnVzZXIiLCJ0aW1lc2VyaWVzLnpvbmVzLjNiYzQ4ZjcwLTE1MTktNGIyNy1hNzEzLWNiZWI2ZTZmYzYwZi5xdWVyeSIsInVhYS5ub25lIiwidGltZXNlcmllcy56b25lcy4zYmM0OGY3MC0xNTE5LTRiMjctYTcxMy1jYmViNmU2ZmM2MGYuaW5nZXN0Il0sImNsaWVudF9pZCI6ImhhY2thdGhvblVBQSIsImNpZCI6ImhhY2thdGhvblVBQSIsImF6cCI6ImhhY2thdGhvblVBQSIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJyZXZfc2lnIjoiOTQxYTMyZTEiLCJpYXQiOjE0NzkzMTI4OTcsImV4cCI6MTQ3OTM1NjA5NywiaXNzIjoiaHR0cHM6Ly9mZmE4MDg3Yy02YmVmLTRmODMtOWZmYi01YmU2N2ZjYWMzODgucHJlZGl4LXVhYS5ydW4uYXdzLXVzdzAyLXByLmljZS5wcmVkaXguaW8vb2F1dGgvdG9rZW4iLCJ6aWQiOiJmZmE4MDg3Yy02YmVmLTRmODMtOWZmYi01YmU2N2ZjYWMzODgiLCJhdWQiOlsidGltZXNlcmllcy56b25lcy4zYmM0OGY3MC0xNTE5LTRiMjctYTcxMy1jYmViNmU2ZmM2MGYiLCJoYWNrYXRob25VQUEiXX0.WT7dc5cMbbouNIcIS48WRAteqeUPGWCpVc_zdB0HiTGXn4gpT0ngpVYXLdQcU7XO5tqGPS8OYdUsc0D-249YYhDz0W4ZDfu-30fdF2vz9AmxmV8TlKL1I1TjHLa0UXFMCaj_4EyhV2w1vYI8P_wJ8dBIy9miB48JmjsobHz9jbrRQQWrB83UiUUTP5Po-yDr8tuk_dBPWFNRxbmAqtjfRXhFS0W0fNmpDE3Q-hjYkAcb0B_Zj8tYJEcn7zthnAmQBKslrBfWU23MQR7QNeu9eeZhMd1szTeK8qaspOcjTpveqI9BmEoTmvaG4YBRtk9VATcmFqa67wUjoIK_OLeP2w',
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
                       console.log(response);
                       res.send(error);
                   }
               });
    
    
});

// apply get block data routes to application
app.use('/getBlockData', mainRouter);
app.use('/getAllAssets', allAssetsRouter);
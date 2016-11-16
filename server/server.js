// load express package and create app
var express = require('express'),
    app = express(),
    path = require('path');

// send index.html page to user upon hitting the home page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// start server
app.listen(1337);
console.log('1337 is the port!');  




// create routes for the admin section

// get instance of router
var adminRouter = express.Router();

// adminRouter middleware
adminRouter.use(function(req, res, next) {
    // log every request to console
    console.log(req.method, req.url);
    
    // continue to route
    next();
});

// route middleware to validate 'name'
adminRouter.param('name', function(req, res, next, name) {
    // do validation on the name parameter
    console.log('Doing name validation on... ' + name);
    
    // once validation is done save the new item in the req before passing to req
    req.name = name;
    // go to next thing
    next();
});

// the admin main page. dashboard: (http://localhost:1337/admin)
adminRouter.get('/', function(req, res) {
    res.send('I am the admin dashboard!');
});

// users page (http://localhost:1337/admin/users)
adminRouter.get('/users', function(req, res) {
    res.send('I am all the users!');
});

// users page with parameter (http://localhost:1337/admin/users/:name)
adminRouter.get('/users/:name', function(req, res) {
    res.send('Hello ' + req.name + '!');
});

// posts page (http://localhost:1337/admin/posts)
adminRouter.get('/posts', function(req, res) {
    res.send('I am all the posts!');
});

// apply admin routes to application
app.use('/admin', adminRouter);
//app.use('/', basicRoutes);
//app.user('/api', apiRoutes);
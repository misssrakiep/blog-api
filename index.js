const http = require('http');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models');
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost:27017/blogger')
const bodyParser = require('body-parser');
const Blogger = require('./blogger');
const blogger = Blogger(models);

/*RESPONSE HEADERS*/
/*Parse JSON data for rendering*/
app.use(bodyParser.urlencoded({
    extended: true
}));


/*Grant access to the resources to the web*/

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', '"Origin, X-Requested-With, Content-Type, Accept"');
    next();
  });


app.use(bodyParser.json());

/*start routes to app*/
app.get('/', function (req, res, next) {
    res.redirect('/api/blog')
});

app.get('/api/blog', blogger.allBlogs);
app.post('/api/entry', blogger.entry);
app.post('/api/delete/:id', blogger.deletePost);

/*Start the server*/
const port =  process.env.PORT || 7070;
app.listen(port, function () {
    console.log("Running on port " + port);
});

app.set('port',  process.env.PORT || port);
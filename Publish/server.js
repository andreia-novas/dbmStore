var express = require('express');
var app = express();
var api = require('./Controllers/api.js');
var frontoffice = require('./Controllers/frontoffice.js');
var backoffice = require('./Controllers/backoffice.js');

var server = app.listen(8082,function () {
    console.log('Example app listening on port 8082')
});

app.use('/api', api);
app.use('/backoffice', backoffice);
app.use('/', frontoffice);
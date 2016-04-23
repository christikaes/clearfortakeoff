var express = require('express');
var app = express();
var path = require("path");
var fs = require('fs');

app.use('/static', express.static(__dirname + '/public'));
app.set('port', (process.env.PORT || 3000));

//this is the main page of the app
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/views/pages/index.html'));
});

var flightDetails = require("./routes/flightdetails");
app.use("/flightdetails", flightDetails);

var weatherDetails = require("./routes/weatherdata");
app.use("/weatherDetails", weatherDetails);

var rtest = require("./routes/rtest");
app.use("/r", rtest);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

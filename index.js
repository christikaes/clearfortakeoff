/*
Launch web server
Visit a URL on our server that activates the web scraper
The scraper will make a request to the website we want to scrape
The request will capture the HTML of the website and pass it along to our server
We will traverse the DOM and extract the information we want
Next, we will format the extracted data into a format we need
Finally, we will save this formatted data into a JSON file on our machine
*/


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

var weatherDetails = require("./routes/weatherData");
app.use("/weatherDetails", weatherDetails);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

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
var request = require('request');

app.use('/static', express.static(__dirname + '/public'));
app.set('port', (process.env.PORT || 3000));

//this is the main page of the app
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/views/pages/index.html'));
});

app.get('/flightdata/:flightnumber', function(req, res) {

    console.log("hi i'm working /flightdata")
    var key_backup = 'christikaes'
    var secret_backup = 'bf80780c69a92619b60df68ed730e4ba45b01df1'


    var key = 'sugaroverflow';
    var secret = '321682929bae540c26ce3ff63cd0f1021748db1c';

    var flightNumber = req.params.flightnumber;

    var options = {
      url: "http://flightxml.flightaware.com/json/FlightXML2/FlightInfo?ident='{0}'".replace("{0}", flightNumber),
      headers: {
        'Authorization': "Basic " + new Buffer(key + ":" + secret, "utf8").toString("base64")
      }
    };

    request(options, function(error, response, body) {
        if (!error) {
          // var resultsObj = JSON.parse(body);
          console.log(body)
          //Just an example of how to access properties:
        }


        //NO UI for the app yet just this ! // call the UI view here later
        res.send('Check your console!')

    });
})

app.get('/weatherdata', function(req, res) {

    lat = 47.4500;
    lng = -122.3117;
    appid = '2db8626a7ac46c83fe388c802fab589c';
    backup_appid = '';
    url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=' + appid;


    request(url, function(error, response, body) {
        if (!error) {

            var resultsObj = JSON.parse(body);
            //Just an example of how to access properties:
            console.log(resultsObj.MRData);

        }

        // To write to the system we will use the built in 'fs' library.
        // In this example we will pass 3 parameters to the writeFile function
        // Parameter 1 :  output.json - this is what the created filename will be called
        // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
        // Parameter 3 :  callback function - a callback function to let us know the status of our function


        //this works and we get the whole json
        // i guess parsing I have to deal with myself! :)
        fs.writeFile('weatherdata.json', JSON.stringify(resultsObj, null, 4), function(err) {

            console.log('File successfully written! - Check your project directory for the weatherdata.json file');

        })

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!')

    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

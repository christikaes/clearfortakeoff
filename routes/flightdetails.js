var router = require("express").Router();
var restler = require("restler");
var request = require("request");
var predictor = require("../R-integration/flight-predict");
var _ = require("underscore");



var fxml_url = "http://flightxml.flightaware.com/json/FlightXML2/";

//flightaware is not free data
// so we've removed our API keys
// you can sign up here: http://flightaware.com/commercial/flightxml/ 
var username = "***";
var apiKey = '***';

function findClosestFlight(time, flightArray) {
	// filter on actualdeparturetime = 0
	var flightsThatHaveNotLeftYet = _.filter(flightArray, function(fl) {
		return fl.actualdeparturetime == 0;
	});

	return _.min(flightsThatHaveNotLeftYet, function(fl) {
		return fl.filed_departuretime;
	});
}

function createWundergroudUrl(flight) {
    var date = convertUnixToDate(flight.filed_departuretime)
    var datesplit = date.split('/');
    var year = datesplit[0];
    var month = datesplit[1];
    var day = datesplit[2];

    //https://www.wunderground.com/history/airport/KLAX/%202016,25,4/CustomHistory.html?dayend=4&monthend=25&yearend=2016&format=1
    //https://www.wunderground.com/history/airport/KLAX/2016/4/23/CustomHistory.html?dayend=23&monthend=4&yearend=2016&format=1
    var wunderground_api = "https://www.wunderground.com/history/airport/";
    var airport_code= flight.destination;
    var date_url = "/" + date + "/";
    var more_url = "CustomHistory.html";
    var day_url = "?dayend=" + day;
    var month_url = "&monthend=" + month;
    var year_url = "&yearend=" + year;
    var finish_url = "&format=1";
    var query = airport_code + date_url + more_url + day_url + month_url + year_url + finish_url;
    return wunderground_api + query;
}

function parseWeatherData(respBody) {
  var weatherSplit = respBody.split("<br />");
  var weatherDataLine = weatherSplit[1].trim();
  var splitWeatherData = weatherDataLine.split(",");
  // remove first EST from weather data
  splitWeatherData.shift();
  return splitWeatherData;
}

router.get('/:flightnumber', function(req, res) {
    restler.get(fxml_url + "FlightInfo", {
        username: username,
        password: apiKey,
        query: { ident: req.params.flightnumber }
    }).on("success", function(f_result, f_response) {
        // var uniqueCarrier = req.params.flightnumber.substring(0, 3);
        var closestFlight = findClosestFlight(new Date(), f_result.FlightInfoResult.flights);
        var uniqueCarrier = req.params.flightnumber.substring(0, 3);
        var airport_code= closestFlight.destination;

        predictor({
          uniqueCarrier: uniqueCarrier,
          origin: airport_code
        }, function(output) {
          res.send(output);
        })

/*
        var wundergroundUrl = createWundergroudUrl(closestFlight);
        console.log(closestFlight);
        console.log(wundergroundUrl);
       	request(wundergroundUrl, function(error, response, body) {
       		if (error) resp.send(error);
          // console.log(body);
          var weatherData = parseWeatherData(body);

          // fake prediction
          // console.log("sending 72%");
          // res.send("72%");

          try {
            predictor({
              uniqueCarrier: req.params.flightnumber.substring(0,3),
              weatherData: weatherData
            }, function(output) {
              res.send(output);
            });
          } catch {
            res.send("couldn't call R");
          }
       	});
        */
    }).on("error", function() {
      console.log("flight info failed");
    });
});

function convertUnixToDate(unix_time) {
    // console.log(unix_time)
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    // var date = new Date(unix_time * 1000);
    // console.log(date)

    // testing with current date time
    var date = new Date();

    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();

    var formattedTime = year + '/' + month + '/' + day;
    // console.log(formattedTime)
    return formattedTime
}

module.exports = router;

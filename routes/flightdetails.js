var router = require("express").Router();
var restler = require("restler");
var predictor = require("../R-integration/flight-predict");

// var key_backup = 'christikaes'
// var secret_backup = 'bf80780c69a92619b60df68ed730e4ba45b01df1'

var fxml_url = "http://flightxml.flightaware.com/json/FlightXML2/";
var username = "sugaroverflow";
var apiKey = '321682929bae540c26ce3ff63cd0f1021748db1c';

router.get('/:flightnumber', function(req, res) {
	restler.get(fxml_url + "FlightInfo", {
		username: username,
		password: apiKey,
		query: { ident : req.params.flightnumber, howMany: 1 }
	}).on("success", function(result, response) {
		// flight#
		// origin => IATA
		// destination => IATA
		// pass in weather data as well
		predictor({
			flightNumber: req.params.flightnumber,
			origin: result.FlightInfoResult.flights[0].origin,
			destination: result.FlightInfoResult.flights[0].origin
		}, function(output) {
			res.send(output);
		});
		
	});
});

module.exports = router;

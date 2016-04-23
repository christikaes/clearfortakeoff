var router = require("express").Router();
var restler = require("restler");
var airportdata = require("../airportdata");

/*
app.get("/airportdata", function(req, res) {
	var iataindex = 4;
	var icaoindex = 5;
	res.send(airportData[0][iataindex] + ", " + airportData[0][icaoindex]);
});
*/

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
		res.send(result);
	});
});

module.exports = router;

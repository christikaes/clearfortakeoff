var rrunr = require("./rrunr");
var airportdata = require("./airportdata");
var _ = require("underscore");

function convertIcaoToIata(icao) {
	var icaoIndex = 4;
	var iataIndex = 5;
	var matchedRow = _.filter(airportData, function(dataRow) {
		return dataRow[icaoIndex] == icao.upperCase();
	});
	return matchedRow[iataIndex];
}

function predict(options, callback) {
	// flight number
	var flightNumber = options.flightNumber;

	// TODO: add weather data
	var origin = convertIcaoToIata(options.origin);
	var destination = convertIcaoToIata(options.destination);

	var args = flightNumber + " " + origin + " " + destination;

	// call R
	rrunr(args, function(routput) {
		// parse R output
		callback(routput);
	});
}
var rrunr = require("./rrunr");
var airportdata = require("./airportdata");
var _ = require("underscore");

function convertIcaoToIata(icao) {
	var icaoIndex = 5;
	var iataIndex = 4;
	var matchedRow = _.filter(airportdata, function(dataRow) {
		return dataRow[icaoIndex] == icao.toUpperCase();
	})[0];
	return matchedRow[iataIndex];
}

function predict(options, callback) {
	// flight number
	var carrier = options.uniqueCarrier;

	// TODO: add weather data
	var origin = convertIcaoToIata(options.origin);
	// var destination = convertIcaoToIata(options.destination);

	var date = new Date();	
	var day=date.getDay() + 1;
	var month = date.getMonth() + 1;
	// var weatherData = options.weatherData;

	// var args = [month, day, carrier].concat(weatherData);
	// var arguments = args.join(" ");

	// console.log("predict");
	// console.log(arguments);

	// var args = [month, day, carrier, maxtemp, meantemp, mintemp, maxdewpoint, meandewpoint, mindewpoint, maxhumid, meanhumid, minhumid, maxsealvl, meansealvl, minsealvl, maxvisibilitymiles, meanvisibilitymiles, minvisibilitymiles, maxwindspeedmph, meanwindspeedmph, maxgustspeedmph, precipitation, cloudcover, events, winddirdegrees];
	// var arguments = args.join(" ");

	// call R

	arguments = origin + " " + carrier;
	console.log(arguments);
	rrunr(arguments, function(routput) {
		// parse R output
		callback(routput);
	});
}

module.exports = predict;
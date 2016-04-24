var router = require("express").Router();
var restler = require("restler");
var dateFormat = require('dateformat');

var username = 'christikaes'
var apiKey = 'bf80780c69a92619b60df68ed730e4ba45b01df1'

var fxml_url = "http://flightxml.flightaware.com/json/FlightXML2/";
// var username = "sugaroverflow";
// var apiKey = '321682929bae540c26ce3ff63cd0f1021748db1c';

router.get('/:airport', function(req, res) {
	restler.get(fxml_url + "MetarEx", {
		username: username,
		password: apiKey,
		query: { airport: req.params.airport,
            howMany: 1 }
	}).on("success", function(result, response) {
    var metarData = result.MetarExResult.metar[0];
    var data = {};

    data.station = req.params.airport;
    var date = new Date(metarData.time*1000);
    data.valid = dateFormat(date, "yyyy-dd-mm HH:MM");
    data.tmpc = metarData.temp_air;
    data.dwpc = metarData.temp_dewpoint;
    data.relh = metarData.temp_relhum;
    data.drct = metarData.wind_direction;
    data.sknt = metarData.wind_speed;
    data.alti = metarData.pressure;
    data.vsby = metarData.visibility;
    data.gust = metarData.wind_speed_gust;

		res.send(data);
	});
});

module.exports = router;

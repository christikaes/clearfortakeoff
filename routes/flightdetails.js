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
        query: {
            ident: req.params.flightnumber,
            howMany: 1
        }
    }).on("success", function(f_result, f_response) {
        // flight#
        // origin => IATA
        // destination => IATA
        // pass in weather data as well

        //to find the closest flight time
        //get the current time
        current_time  = current_time()


        //grab the unix time from the flight data
        unix_time = f_result.FlightInfoResult.flights[0].filed_departuretime
        flight_date = convertUnixToDate(unix_time)
            //date array holds [year, month, day]
        date = flight_date.split('/')
        year = date[0]
        month = date[1]
        day = date[2]

        //https://www.wunderground.com/history/airport/KLAX/%202016,25,4/CustomHistory.html?dayend=4&monthend=25&yearend=2016&format=1
        //https://www.wunderground.com/history/airport/KLAX/2016/4/23/CustomHistory.html?dayend=23&monthend=4&yearend=2016&format=1
        var wunderground_api = "https://www.wunderground.com/history/airport/"
        var airport_code= f_result.FlightInfoResult.flights[0].destination
        var date_url = "/ " + flight_date + "/"
        var more_url = "CustomHistory.html"
        var day_url = "?dayend=" + day
        var month_url = "&monthend=" + month
        var year_url = "&yearend=" + year
        var finish_url = "&format=1"

        var query = airport_code + date_url + more_url + day_url + month_url + year_url + finish_url


        restler.get(wunderground_api + query, {

        }).on("success", function(result, response) {
            res.send(result);
        });

        console.log(wunderground_api + query)


        // predictor({
        //     flightNumber: req.params.flightnumber,
        //     origin: f_result.FlightInfoResult.flights[0].origin,
        //     destination: f_result.FlightInfoResult.flights[0].destination
        //
        // }, function(output) {
        //     res.send(output);
        // });

    });
});

//find current time

function current_time(){
  var date = new Date();
  return date
}
//find the closest date




function convertUnixToDate(unix_time) {
    // console.log(unix_time)
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_time * 1000);
    // console.log(date)

    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();

    var formattedTime = year + '/' + day + '/' + month;
    // console.log(formattedTime)
    return formattedTime

}

module.exports = router;

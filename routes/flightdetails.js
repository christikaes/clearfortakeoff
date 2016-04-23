var router = require("express").Router();
var request = require("request");

router.get('/flightdata/:flightnumber', function(req, res) {

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
});

module.exports = router;

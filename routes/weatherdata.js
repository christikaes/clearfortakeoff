var router = require("express").Router();
var request = require("request");

router.get('/weatherdata', function(req, res) {

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


        fs.writeFile('weatherdata.json', JSON.stringify(resultsObj, null, 4), function(err) {

            console.log('File successfully written! - Check your project directory for the weatherdata.json file');

        })

        res.send('Check your console!')

    });
});

module.exports = router;
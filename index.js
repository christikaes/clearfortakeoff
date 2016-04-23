var express = require('express');
var app = express();
var path    = require("path");

app.set('port', (process.env.PORT || 3000));

//this is the main page of the app
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/views/pages/index.html'));
});




app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

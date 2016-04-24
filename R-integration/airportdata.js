// var csvparse = require("csv-parse");
var parse = require('csv-parse/lib/sync');
var fs = require("fs");
var csvFile = fs.readFileSync("./R-integration/airports.csv").toString();
module.exports = parse(csvFile);




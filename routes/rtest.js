var router = require("express").Router();
var rrunr = require("../R-integration/rrunr");

var rfile = "test.R";

router.get("/:args", function(req, res) {
	rrunr(rfile, req.params.args, function(output) {
		res.send(output);
	});
});

module.exports = router;


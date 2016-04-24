var exec = require("child_process").exec;
// var file = "test.R";
// var file = "./R/code/rtest1.R";
// var file = "./R/code/rintegration.R";
var file = "./R/code/predict_delay.R";

function runr(args, callback) {
	var cmd = "Rscript {0} {1}"
		.replace("{0}", file)
		.replace("{1}", args || "");
	exec(cmd, function(error, stdout, stderr) {
		if (error) console.log(error);
		callback(stdout);
	});
}

module.exports = runr;

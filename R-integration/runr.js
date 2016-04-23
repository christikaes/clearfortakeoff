var exec = require("child_process").exec;
var rfile = "test.R"
var cmd = "Rscript {0} {1}"
	.replace("{0}", rfile)
	.replace("{1}", "asdf");

exec(cmd, function(error, stdout, stderr) {
	if (error) console.log(error);
	console.log(stdout);
	console.log(stderr);
});
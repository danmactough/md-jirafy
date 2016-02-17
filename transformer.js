module.exports = function (transformer, cb) {
	var input = '';
	var hasReturned = false;
	var done = function (err, result) {
		if (!hasReturned) {
			hasReturned = true;
			cb(err, result);
		}
	};
	process.stdin.setEncoding("utf8");
	process.stdin.on("data", function (data) {
		input += data;
	});
	process.stdin.once("error", function (err) {
		done(err);
	});
	process.stdin.once("end", function () {
		done(null, transformer(input));
	});
};

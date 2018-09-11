const tests = require ("../models/tests");

let testsData = {

	showTests: function(req, res){
		tests.find({}, function(err, data){
			if(err){
				res.status(500).send(err);
				console.log(err);
			} else {
				res.json(data);
			}
		});
	},

	addTests: function(req, res){
		tests.create(req.body, function(err){
			if(err){
				res.status(500).send(err);
				console.log(err);
			} else {
				res.json({});
			}
		});
	}
};
module.exports = testsData;
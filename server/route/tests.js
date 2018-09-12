const tests = require ("../models/tests");

let testsData = {

	showTests: function(req, res){
		console.log(req.session);
		tests.find({"user":req.session.user.login}, function(err, data){
			if(err){
				res.status(500).send(err);
				console.log(err);
			} else {
				res.json(data);
			}
		});
	},

	addTests: function(req, res){
		let obj = {
			"groupName": req.body.groupName,
			"result":req.body.result,
			"user":req.session.user.login
		};
		tests.create(obj, function(err){
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
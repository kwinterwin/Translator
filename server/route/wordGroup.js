const wordGroup = require ("../models/wordGroup");

let wordGroupData = {

	showGroup: function(req, res){
		console.log(req.session);
		wordGroup.find({"user":req.session.user.login}, function(err, data){
			if(err){
				res.status(500).send(err);
				console.log(err);
			} else {
				let mass = data.map((item)=>{
					item.id = item._id;
					return item;
				});
				res.json(mass);
			}
		});
	},

	addGroup: function(req, res){
		let name = req.body.name;
		let words = JSON.parse(req.body.values);
		let newGroup = {
			name,
			words,
			"user" : req.session.user.login
		};
		wordGroup.create(newGroup, function(err){
			if(err){
				res.status(500).send(err);
				console.log(err);
			} else {
				res.json({});
			}
		});
	},

	delGroup: function(req, res){
		wordGroup.findByIdAndRemove(req.body._id, function(err){
			if(err){
				res.status(500).send(err);
				console.log(err);
			} else {
				res.json({});
			}
		});
	},

	changeGroup: function(req, res){
		let name = req.body.name;
		var words = JSON.parse(req.body.values);
		let newGroup = {
			name,
			words
		};
		wordGroup.findByIdAndUpdate(req.params.id, newGroup, function(err){
			if(err){
				res.status(500).send(err);
				console.log(err);
			} else {
				res.json({});
			}
		});
	},
};
module.exports = wordGroupData;
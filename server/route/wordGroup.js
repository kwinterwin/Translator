const wordGroup = require ("../models/wordGroup");

let wordGroupData = {

	// saveData(req, res){
	// 	books.findByIdAndUpdate(req.body._id, req.body, function(err){
	// 		if(err){
	// 			console.log(err);
	// 			res.status(500).send(err);
	// 		} else {
	// 			res.json({});
	// 		}
	// 	});
	// },

	showData(req, res){
		wordGroup.find({}, function(err, data){
			if(err){
				console.log(err);
				res.status(500).send(err);
			} else{
				res.json(data);
			}
		});
	},

	deleteData(req, res){
		wordGroup.findByIdAndRemove(req.body._id, function(err){
			if(err){
				console.log(err);
				res.status(500).send(err);
			} else{
				res.json({});
			}
		});
	},

	addData(req, res){
		wordGroup.create(req.body, function(err){
			if(err){
				console.log(err);
				res.status(500).send(err);
			} else{
				res.json({});
			}
		});
	}	
};
module.exports = wordGroupData;
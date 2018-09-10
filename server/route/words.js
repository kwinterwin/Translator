const words= require("../models/words");

let wordsData = {

	getData(req,res){
		words.find({}, function(err, data){
			if(err){
				console.log(err);
				res.status(500).send(err);
			} else{
				let mass = data.map((item)=>{
					item.id = item._id;
					return item;
				});
				res.json(mass);
			}
		});
	},

	addData(req,res){
		words.create(req.body, function(err){
			if(err){
				console.log(err);
				res.status(500).send(err);
			} else{
				res.json({});
			}
		});
	},

	wordsForGroup:function(req,res){
		let word = req.body.filter;
		let massId = JSON.parse(word);
		words.find({}, function(err, data){
			if(err){
				console.log("ERROR!");
				err.problem = true;
				res.json(err);
			} else{
				let length = massId.length;
				let massWord = data.filter((item)=>{
					for(let i=0; i<length; i++){
						if(item._id == massId[i]) return true;
					}
					return false;
				});
				res.json(massWord);
			}
		});
	}

	// showData(req, res){
	// 	let userFilter = "";

	// 	if(req.query.filter){
	// 		let user = req.query.filter;
	// 		userFilter = {
	// 			FirstName: new RegExp(user.FirstName, "i"),
	// 			LastName: new RegExp(user.LastName, "i"),
	// 			Phone: new RegExp(user.Phone, "i"),
	// 			Job: new RegExp(user.Job, "i"),
	// 		};
	// 	}

	// 	if(req.query.sort){
	// 		console.log("sort");
	// 		words.find({}).sort(req.query.sort).exec(function(err, data) {
	// 			if(err){
	// 				console.log(err);
	// 				res.status(500).send(err);
	// 			} else{
	// 				if(req.query.filter){
	// 					words.find(userFilter).sort(req.query.sort).exec(function(err, data){
	// 						if(err){
	// 							console.log(err);
	// 							res.status(500).send(err);
	// 						} else{
	// 							res.json(data);
	// 						}
	// 					});
	// 				}
	// 				else{
	// 					res.json(data);
	// 				}
	// 			}
	// 		});
	// 	}
	// 	else if(req.query.filter){

	// 		let count = Number(req.query.count);
	// 		let skip = Number(req.query.start);

	// 		words.find(userFilter).skip(skip).limit(count).exec(function(err, data){
	// 			if(err){
	// 				console.log(err);
	// 				res.status(500).send(err);
	// 			}
	// 			else{
	// 				res.json({
	// 					"data": data,
	// 					"pos": req.query.start
	// 				});
	// 			}
	// 		});
	// 	} 		
	// 	else {
	// 		words.find({}, function(err, allData){
	// 			if(err){
	// 				console.log(err);
	// 				res.status(500).send(err);
	// 			}
	// 			else {
	// 				words.find({}).limit(15).exec(function(err, data){
	// 					if(err){
	// 						console.log(err);
	// 						res.status(500).send(err);
	// 					}
	// 					else{
	// 						res.json({
	// 							"data": data,
	// 							"pos": 0,
	// 							"total_count": allData.length
	// 						});
	// 					}
	// 				});
	// 			}
	// 		});
			
			
	// 	}
		
	// },

	// saveData(req, res){
	// 	words.findByIdAndUpdate(req.body._id, req.body, function(err){
	// 		if(err){
	// 			res.status(500).send(err);
	// 		} else {
	// 			res.json({});
	// 		}
	// 	});
	// }
};

module.exports = wordsData;
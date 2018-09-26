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

	
};

module.exports = wordsData;
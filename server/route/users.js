const users = require ("../models/users");

let usersData = {

	login: function(req, res){
		let user = {};
		user.login = req.body.user;
		user.password = req.body.pass;
		users.find(user, function (err, data) {
			if(err){
				res.status(500).send(err);
				console.log(err);
			} else {
				if(data.length == 1){
					req.session.user = user;
					res.send(user);
				}
				else
					res.send(null);
			}
		});
	},

	loginStatus: function(req, res){
		res.send(req.session.user || null);
	},

	logout: function(req,res){
		delete req.session.user;
		res.send({});
	},
    
	authorization: function(req, res){
		users.create(req.body, function(err){
			if(err){
				res.status(500).send(err);
				console.log(err);
			} else {
				res.json({});
			}
		});
	}
};
module.exports = usersData;

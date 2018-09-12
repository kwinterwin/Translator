const mongoose  = require("mongoose");

let users = new mongoose.Schema({
	login: String,
	password: String
});

module.exports = mongoose.model("users", users); 
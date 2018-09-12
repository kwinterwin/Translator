const mongoose  = require("mongoose");

let tests = new mongoose.Schema({
	initializationDate: {type: Date, default: Date.now},
	groupName: String,
	result: Number,
	user: String
});

module.exports = mongoose.model("tests", tests); 
const mongoose  = require("mongoose");

let tests = new mongoose.Schema({
	// Name: String,
	// Year: Number,
	// Author: String,
	// Category: Number,
	// Description: String
});

module.exports = mongoose.model("tests", tests); 
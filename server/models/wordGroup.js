const mongoose  = require("mongoose");

var wordGroup = new mongoose.Schema({
	name: String,
	wordCount: Number,
	initializationDate: {type: Date, default: Date.now},
	words : [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "words"
		}
	]
});

module.exports = mongoose.model("wordGroup", wordGroup);
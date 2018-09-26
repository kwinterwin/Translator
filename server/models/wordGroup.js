const mongoose  = require("mongoose");

var wordGroup = new mongoose.Schema({
	name: String,
	initializationDate: {type: Date, default: Date.now},
	words : [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "words"
		}
	],
	id: String,
	user: String
});

module.exports = mongoose.model("wordGroup", wordGroup);
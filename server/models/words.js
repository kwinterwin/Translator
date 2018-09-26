const mongoose  = require("mongoose");

let words = new mongoose.Schema({
	originalName: String,
	translationEng: String,
	partOfSpeech: String,
	id: String
});

module.exports = mongoose.model("words", words);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const wordGroup = require("./server/route/wordGroup");
const words = require("./server/route/words");
const tests = require("./server/route/tests");

let app = express();

let port = 3000;

mongoose.connect("mongodb://localhost/translator");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get("/wordGroup", wordGroup.showGroup);
app.post("/wordGroup", wordGroup.addGroup);
app.delete("/wordGroup/:id", wordGroup.delGroup);
app.put("/wordGroup/:id", wordGroup.changeGroup);

app.get("/words", words.getData);
app.post("/words", words.addData);
app.post("/words/test", words.wordsForGroup);

app.post("/tests", tests.addTests);
app.get("/tests", tests.showTests);


app.listen(port, ()=>{
	console.log("Start");
});
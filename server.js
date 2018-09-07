const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const wordGroup = require("./server/route/wordGroup");
const words = require("./server/route/words");
// const files = require("./server/models/files");

let app = express();

let port = 3000;

mongoose.connect("mongodb://localhost/translator");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get("/wordGroup", wordGroup.showData);
app.post("/wordGroup", wordGroup.addData);

app.get("/words", words.getData);
app.post("/words", words.addData);


app.listen(port, ()=>{
	console.log("Start");
});
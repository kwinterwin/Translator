const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const wordGroup = require("./server/route/wordGroup");
const words = require("./server/route/words");
const tests = require("./server/route/tests");
const users = require("./server/route/users");
const session = require("express-session");

let app = express();

let port = 3000;

mongoose.connect("mongodb://localhost/translator");
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: "replace this string... k12jh40918e4019u3",
	resave: false,
	saveUninitialized:true,
	cookie: { maxAge: 60*60*1000 }
}));

app.get("/server/wordGroup", wordGroup.showGroup);
app.post("/server/wordGroup", wordGroup.addGroup);
app.delete("/server/wordGroup/:id", wordGroup.delGroup);
app.put("/server/wordGroup/:id", wordGroup.changeGroup);

app.get("/server/words", words.getData);
app.post("/server/words", words.addData);
app.post("/server/words/test", words.wordsForGroup);

app.post("/server/tests", tests.addTests);
app.get("/server/tests", tests.showTests);


app.post("/server/login", users.login);
app.post("/server/login/status", users.loginStatus);
app.post("/server/logout", users.logout);
app.post("/server/login/authorization", users.authorization);

app.listen(port, ()=>{
	console.log("Start");
});
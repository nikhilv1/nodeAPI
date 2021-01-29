var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/BusinessDatabase");
var businessSchema = new mongoose.Schema({
	busUnit: String,
	busDesc: String
});

var User = mongoose.model("User", businessSchema);

app.get("/", (req, res)=>{
	res.sendFile(__dirname + "/index.html");
});

app.post("/submitPage", (req, res) =>{
	var myData = new User(req.body);
	myData.save()
		.then(item =>{
			res.send("Data Saved to database");
		})
		.catch(err => {
			res.status(400).send("unable to save to database");
		});
});


app.listen(port, () =>{
	console.log("server listening to port " +port);
});


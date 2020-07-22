var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public")); // set the static files location /public/img will be /img for users
app.use("/public/uploads",express.static(__dirname + "/public/uploads"));
app.use(morgan("dev")); // log every request to the console
app.use(bodyParser.urlencoded({"extended":"true"})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
    });

    var port = process.env.PORT || 8080;
    var router = express.Router();
    app.use("/v1/api", router);
    app.listen(port);
    console.log("Magic happens on port " + port);

    router.get("/",function(req,res){
        res.sendFile("./index.html")
    });
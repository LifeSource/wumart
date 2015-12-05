var express = require("express"),
    bodyParser = require("body-parser");

var config = require("../../config")();

var path = {
    root: "./",
    build: "./dist/",
    buildIndex: "./dist/index.html",
    client: "./src/client/",
    index: "./src/client/index.html"
};

var port = process.env.PORT || 3000,
    environment = process.env.NODE_ENV || "dev";

var app = express();

// database setup
require("./models/db");

// middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// api goes here.
require("./apis/index")(app);

// static files
switch (environment) {
    case "production":
        app.use(express.static(path.build));
        app.use("/*", express.static(path.buildIndex));
        break;
    default:
        app.use(express.static(path.client));
        app.use(express.static(path.root));
        app.use("/*", express.static(path.index));
        break;
}

app.listen(port, function () {
    console.log("Server started, listening on port: " + port);
});

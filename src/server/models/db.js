var mongoose = require("mongoose");

var connectionString = "mongodb://localhost/wumart",
    db = mongoose.connect(connectionString);

db.connection.on("connected", function() {
    console.log("Mongoose connected to: " + connectionString);
});

db.connection.on("error", function(err) {
    console.log("Mongoose encountered an error: " + err);
});

db.connection.on("disconnected", function() {
    console.log("Mongoose disconnected from: " + connectionString);
});

var gracefulShutdown = function(msg, callback) {
    db.connection.close(function() {
        console.log("Mongoose disconnected through " + msg);
        callback();
    });
};

process.once("SIGUSR2", function() {
    gracefulShutdown("nodemon restart", function() {
        process.kill(process.pid, "SIGUSR2");
    });
});

process.on("SIGINT", function() {
    gracefulShutdown("app termination", function() {
        process.exit(0);
    });
});

process.on("SIGTERM", function() {
    gracefulShutdown("Heroku app shtudown", function() {
        process.exit(0);
    });
});

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var reviewSchema = new Schema({
    author: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5},
    createdOn: { type: Date, "default": Date.now},
    comments: String
});

module.exports = mongoose.model("Review", reviewSchema, "Reviews");

var mongoose = require("mongoose"),
    Review = require("./review");

var productSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        min: 0
    },
    category: String,
    description: String,
    reviews: [Review.schema]
});

module.exports = mongoose.model("Product", productSchema, "Products");

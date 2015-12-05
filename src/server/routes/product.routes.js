var express = require("express");

module.exports = function () {

    var router = express.Router(),
        productController = require("../controllers/product.controller")();

    router.route("/")
        .get(productController.getAll)
        .post(productController.post);

    router.use("/:id", productController.use);

    router.route("/:id")
        .get(productController.get)
        .put(productController.put)
        .delete(productController.remove);

    return router;
    
};

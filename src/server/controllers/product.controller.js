var Product = require("../models/product");

module.exports = function() {

    var productController = {

        use: use,
        get: get,
        post: post,
        put: put,
        remove: remove,
        getAll: getAll
    };

    return productController;


    function getAll(req, res) {
        Product.find()
            .exec(function(err, products) {
                err ? res.status(500).send(err) : res.status(200).send(products);
            });
    }

    function use(req, res, next) {

        var product = new Product();

        Product.findById(req.params.id, function(err, product) {
            if (err) {
                res.status(500).send(err);
            } else if (product) {
                req.product = product;
                next();
            } else {
                res.status(404).send("Product not found!");
            }
        });
    }


    function get(req, res) {
        res.json(req.product);
    }

    function post(req, res) {

        var product = new Product(req.body);

        product.save(function (err, product) {
            (err) ? res.status(500).send(err) : res.status(201).send(product);
        });
    }


    function put(req, res) {

    }

    function remove(req, res) {

    }

};

var Product = require("../models/product");

module.exports = function () {
    
    var productController = {

        use:use,
        get: get,
        post: post,
        put: put,
        remove: remove,
        getAll: getAll
    };

    return productController;


    function getAll(req, res) {
        console.log("query!");
        
        Product.find()
            .exec(function (err, products) {
                err ? res.status(500).send(err) : res.status(200).send(products);
            });
    }

    function use(req, res, next) {
        
    }


    function get(req, res) {
        
    }

    function post(req, res) {
        
    }


    function put(req, res) {
        
    }

    function remove(req, res) {
        
    }
    
};

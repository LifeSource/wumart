module.exports = function (app) {

    var productsRouter = require("../routes/product.routes")();

    app.use("/api/products", productsRouter);
};

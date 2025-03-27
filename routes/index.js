const { Router } = require("express");

const productsRouter = require("./products.router")
const usersRouter = require("./users.router")

function routerApi(app) {
    const router = Router();
    app.use("/api/v1", router);
    router.use("/products", productsRouter);
    router.use("/users", usersRouter);
}

module.exports = routerApi
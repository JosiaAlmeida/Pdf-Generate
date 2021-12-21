"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("./databases/products");
const routes = (0, express_1.Router)();
routes.get("/products", (req, res) => {
    products_1.products.findAll().then((d) => res.send(d));
});
exports.default = routes;

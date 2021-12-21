"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const db = require('./db_connect');
exports.products = db.sequelize.define('product', {
    nome: {
        type: db.Sequelize.STRING
    },
    description: {
        type: db.Sequelize.STRING
    },
    price: {
        type: db.Sequelize.INTEGER
    },
    quantity: {
        type: db.Sequelize.INTEGER
    },
});
//products.sync({force: true})

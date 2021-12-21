"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dados = void 0;
const db = require('./db_connect');
exports.dados = db.sequelize.define('teste', {
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    assunto: {
        type: db.Sequelize.STRING
    },
});
//dados.sync({force: true})

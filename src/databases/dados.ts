const db = require('./db_connect')

export interface dadosI{
    id: Number
    nome: String
    email: String
    assunto: String
}

export const dados = db.sequelize.define ('teste',{
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    assunto: {
        type: db.Sequelize.STRING
    },
})
//dados.sync({force: true})
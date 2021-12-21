const db = require('./db_connect')

export interface IProducts {
    nome: string
    description: string
    price: number
    quantity: number
}

export const products = db.sequelize.define ('product',{
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
})
//products.sync({force: true})
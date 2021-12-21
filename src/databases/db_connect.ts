//import {Sequelize} from "sequelize";
const Sequelize = require('sequelize')

const sequelize = new Sequelize('sistema', 'root', 'root',{dialect: 'mysql', host: 'localhost'})


sequelize.authenticate().then(()=>{
    console.log("Conectado a base de dados com sucesso")
}).catch(()=>{
    console.log("Falha ao conectar a base de dados ")
})


module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
}
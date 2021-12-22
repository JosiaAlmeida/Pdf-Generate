import express from 'express'
import { Request, Response, NextFunction } from 'express'
import routes from './routes'
import bodyParser from 'body-parser'

const app = express()

app.use((req:Request, res: Response, next: NextFunction)=> next())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(routes)

app.get('/', (req:Request, res: Response, next: NextFunction)=> res.send("Rota funcionando"))

app.listen(3001, ()=> console.log("Server is running on port 3001"))
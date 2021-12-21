import { Router, Request, Response, NextFunction, response } from "express";
import {IProducts, products} from './databases/products'
const routes = Router()

routes.get("/products", (req: Request, res: Response)=>{
    products.findAll().then((d: IProducts)=> res.send(d))
})


export default routes
import { Router, Request, Response, NextFunction, response } from "express";
import {IProducts, products} from './databases/products'
import PDFPrinter from 'pdfmake';
import { TDocumentDefinitions } from "pdfmake/interfaces";
import fs from 'fs'

const routes = Router()

const fonts = {
    Helvetica:{
        normal:"Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique"
    }
}


routes.get("/products", (req: Request, res: Response)=>{
    products.findAll().then((d: IProducts)=> res.send(d))
})

routes.get("/products/report", (req: Request, res: Response)=>{
    try {
        const printer = new PDFPrinter(fonts)

        const body = []
        /*for (let product of products.values()){
            const rows = new Array()
            rows.push(product.dataValues.id)
            rows.push(product.dataValues.nome)
            rows.push(product.dataValues.description)
            rows.push(product.dataValues.price)
            rows.push(product.dataValues.quantity)
            body.push(rows)
        }*/

        //Definicoes do documentos
        const docDefinitions: TDocumentDefinitions = {
            defaultStyle: {font: "Helvetica"},
            content: [
                {
                    table: {
                        body: [
                            ["ID", "Nome","Descricao", "Preco", "Quantidade"],
                            ...body
                        ]
                    }
                }
            ]
        }

        //Passar a definicao do relatorio
        const pdfDoc = printer.createPdfKitDocument(docDefinitions)

        //Move o conteudo para um local definido no fs
        pdfDoc.pipe(fs.createWriteStream("Relatorio.pdf"))

        const chunks = []

        //trabalhando com o conteudo do relatio
        //pegando pedacos do relatorio
        pdfDoc.on("data", (chunk)=>{
            chunks.push(chunk)
        })

        pdfDoc.end()

        pdfDoc.on("end",()=>{
            const result = Buffer.concat(chunks)
            res.end(result)
        })

    } catch (error) {
        throw error
    }
})

export default routes
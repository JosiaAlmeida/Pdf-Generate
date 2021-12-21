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
    const printer = new PDFPrinter(fonts)

    //Definicoes do documentos
    const docDefinitions: TDocumentDefinitions = {
        defaultStyle: {font: "Helvetica"},
        content: [
            {
                text: "Meu primeiro relatorio do Code Drops"
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

})

export default routes
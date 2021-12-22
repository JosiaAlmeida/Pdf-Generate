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
const Row = new Array()
const BodyPDF = []
let id = 0
routes.post('/products',async(req: Request, res: Response)=>{
    const nome = await req.body.nome;
    const description = await req.body.description;
    const price = await req.body.price;
    const quantity = await req.body.quantity;
    id =id+ 1
    Row.push(id)
    Row.push(nome)
    Row.push(description)
    Row.push(price)
    Row.push(quantity)
    BodyPDF.push(Row)
    
    res.send("Dados adicionado "+ BodyPDF);
})

routes.get("/products/report", (req: Request, res: Response)=>{
    try {
        const printer = new PDFPrinter(fonts)

        let body = []
        if(BodyPDF.length > 0 || BodyPDF !=undefined){
            BodyPDF.map(x=>{
                body = [...x]
            })
        }
        //Definicoes do documentos
        const DataH = new Date()
        const Time = Date.parse(`${DataH}`)
        const docDefinitions: TDocumentDefinitions = {
            defaultStyle: {font: "Helvetica"},
            content: [
                {
                    columns: [
                        {
                            text: "Relatorio",
                            style: "header"
                        },
                        {
                            text: `${DataH.getHours()}:${DataH.getMinutes()}: ${DataH.getSeconds()}\n\n`,
                            style: "header"
                        }
                    ]
                },
                {
                    table: {
                        body: [
                            [
                                {text: "ID",style:"columnsTitle"},
                                {text: "Nome",style:"columnsTitle"},
                                {text: "Descricao",style:"columnsTitle"},
                                {text: "Preco",style:"columnsTitle"},
                                {text: "Quantidade",style:"columnsTitle"},
                            ],
                            body
                        ]
                    }
                }
            ],
            styles:{
                header: {
                    fontSize: 18,
                    bold: true,
                },
                columnsTitle:{
                    fontSize: 18,
                    bold: true,
                }
            }
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

export default routes;
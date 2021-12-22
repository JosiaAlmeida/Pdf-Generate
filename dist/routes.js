"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("./databases/products");
const pdfmake_1 = __importDefault(require("pdfmake"));
const fs_1 = __importDefault(require("fs"));
const routes = (0, express_1.Router)();
const fonts = {
    Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique"
    }
};
routes.get("/products", (req, res) => {
    products_1.products.findAll().then((d) => res.send(d));
});
const Row = new Array();
const BodyPDF = [];
let id = 0;
routes.post('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nome = yield req.body.nome;
    const description = yield req.body.description;
    const price = yield req.body.price;
    const quantity = yield req.body.quantity;
    id = id + 1;
    Row.push(id);
    Row.push(nome);
    Row.push(description);
    Row.push(price);
    Row.push(quantity);
    BodyPDF.push(Row);
    res.send("Dados adicionado " + BodyPDF);
}));
routes.get("/products/report", (req, res) => {
    try {
        const printer = new pdfmake_1.default(fonts);
        let body = [];
        if (BodyPDF.length > 0 || BodyPDF != undefined) {
            BodyPDF.map(x => {
                body = [...x];
            });
        }
        console.log(body);
        //Definicoes do documentos
        const DataH = new Date();
        const Time = Date.parse(`${DataH}`);
        const docDefinitions = {
            defaultStyle: { font: "Helvetica" },
            content: [
                {
                    columns: [
                        {
                            text: "Relatorio"
                        },
                        {
                            text: `${DataH.getHours()}:${DataH.getMinutes()}: ${DataH.getSeconds()}`
                        }
                    ]
                },
                {
                    table: {
                        body: [
                            ["ID", "Nome", "Descricao", "Preco", "Quantidade"],
                            body
                        ]
                    }
                }
            ]
        };
        //Passar a definicao do relatorio
        const pdfDoc = printer.createPdfKitDocument(docDefinitions);
        //Move o conteudo para um local definido no fs
        pdfDoc.pipe(fs_1.default.createWriteStream("Relatorio.pdf"));
        const chunks = [];
        //trabalhando com o conteudo do relatio
        //pegando pedacos do relatorio
        pdfDoc.on("data", (chunk) => {
            chunks.push(chunk);
        });
        pdfDoc.end();
        pdfDoc.on("end", () => {
            const result = Buffer.concat(chunks);
            res.end(result);
        });
    }
    catch (error) {
        throw error;
    }
});
exports.default = routes;

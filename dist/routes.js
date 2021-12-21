"use strict";
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
routes.get("/products/report", (req, res) => {
    const printer = new pdfmake_1.default(fonts);
    //Definicoes do documentos
    const docDefinitions = {
        defaultStyle: { font: "Helvetica" },
        content: [
            {
                text: "Meu primeiro relatorio do Code Drops"
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
});
exports.default = routes;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((req, res, next) => next());
app.use(routes_1.default);
app.get('/', (req, res, next) => res.send("Rota funcionando"));
app.listen(3001, () => console.log("Server is running on port 3001"));

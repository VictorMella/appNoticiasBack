"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("./clases/server"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// RUTAS
const usuario_1 = __importDefault(require("./rutas/usuario"));
const contacto_1 = __importDefault(require("./rutas/contacto"));
const imagenesYo_1 = __importDefault(require("./rutas/imagenesYo"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const sobreMi_1 = __importDefault(require("./rutas/sobreMi"));
const tecnologias_1 = __importDefault(require("./rutas/tecnologias"));
const noticias_1 = __importDefault(require("./rutas/noticias"));
const server = new server_1.default();
//BODY PARSER
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// FILEUPLOAR
server.app.use(express_fileupload_1.default());
//CONECTAR BD
mongoose_1.default.connect('mongodb://localhost:27017/victorBase', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err)
        throw "err";
    console.log('CONECTADO BD');
});
//RUTAS
server.app.use('/usuario', usuario_1.default);
server.app.use('/contacto', contacto_1.default);
server.app.use('/uploadYo', imagenesYo_1.default);
server.app.use('/sobreMi', sobreMi_1.default);
server.app.use('/tecnologias', tecnologias_1.default);
server.app.use('/noticias', noticias_1.default);
//CONECTAR AL SERVER
server.start(() => {
    console.log(`Servidor Victor corriendo en el puerto ${server.port}`);
});
// CORRER PROYECTO
// nodemon noticia
// VISUALIZAR CAMBIOS
// tsc -w

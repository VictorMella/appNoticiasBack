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
const autentication_1 = require("../middelwares/autentication");
const noticias_1 = require("../models/noticias");
const fileSystemNoticias_1 = __importDefault(require("../clases/fileSystemNoticias"));
const noticiasRutas = express_1.Router();
const fileSystemNoticias = new fileSystemNoticias_1.default();
// Crear Noticia
noticiasRutas.post('/:imgNoticia/:imgAutor', autentication_1.verificarToken, (req, res) => {
    const body = req.body;
    const imgNoticia = req.params.imgNoticia;
    const imgAutor = req.params.imgAutor;
    body.imgNoticia = imgNoticia;
    body.imgAutor = imgAutor;
    noticias_1.Noticias.create(body)
        .then(noticiaBD => {
        res.json({
            ok: true,
            noticiaBD
        });
    })
        .catch(err => {
        res.json({
            err
        });
    });
});
// NOTICIAS PAGINADAS
noticiasRutas.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let saltar = pagina - 1;
    saltar = saltar * 8;
    const noticias = yield noticias_1.Noticias.find()
        .sort({ _id: 1 })
        .skip(saltar)
        .limit(8) // Limit es para el número de usuarios que queremos obtener
        .exec();
    res.json({
        ok: true,
        pagina,
        cantidadRegistros: noticias.length,
        noticias
    });
}));
// SUBIR IMAGEN AUTOR
noticiasRutas.post('/uploadImgAutor', autentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file1 = req.files.imgAutor;
    yield fileSystemNoticias.guardarImgAutor(file1);
    res.json({
        ok: true,
        file1: file1.name
    });
}));
// SUBIR IMAGEN NOTICIA
noticiasRutas.post('/uploadImgNoticia', autentication_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file1 = req.files.imgNoticia;
    yield fileSystemNoticias.guardarImgNoticia(file1);
    res.json({
        ok: true,
        file1: file1.name
    });
}));
// MOSTRAR IMAGEN NOTICIA POR URL
noticiasRutas.get('/imgNoticia/:imgNoticia', (req, res) => {
    const img = req.params.imgNoticia;
    const pathImagen = fileSystemNoticias.getImgUrlNoticia(img);
    res.sendFile(pathImagen);
});
// MOSTRAR IMAGEN AUTOR POR URL
noticiasRutas.get('/imgAutor/:imgAutor', (req, res) => {
    const img = req.params.imgAutor;
    const pathImagen = fileSystemNoticias.getImgUrlAutor(img);
    res.sendFile(pathImagen);
});
exports.default = noticiasRutas;

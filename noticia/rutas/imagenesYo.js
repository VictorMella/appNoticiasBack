"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileSystemYo_1 = __importDefault(require("../clases/fileSystemYo"));
const autentication_1 = require("../middelwares/autentication");
const imagenesYo_1 = require("../models/imagenesYo");
const yoRutas = express_1.Router();
const fileSystemYo = new fileSystemYo_1.default();
// SUBIR IMAGENES
yoRutas.post('/', autentication_1.verificarToken, (req, res) => {
    const body = req.body;
    const file = req.files.img;
    body.img = file.name;
    imagenesYo_1.Imgyo.create(body)
        .then(imgYoBD => {
        res.json({
            ok: true,
            imgYoBD
        });
    })
        .then(() => {
        fileSystemYo.guardarImagenYo(file, req.usuario.nombre);
    })
        .catch(err => {
        res.json({
            err
        });
    });
});
exports.default = yoRutas;

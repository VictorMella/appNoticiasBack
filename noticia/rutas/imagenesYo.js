"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileSystemYo_1 = __importDefault(require("../clases/fileSystemYo"));
const autentication_1 = require("../middelwares/autentication");
const imagenesYo_1 = require("../models/imagenesYo");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
// MOSTRAR IMAGEN POR URL
yoRutas.get('/victorMella/:img/:nombreCarpeta', (req, res) => {
    const img = req.params.img;
    const nombreCarpeta = req.params.nombreCarpeta;
    const pathImagen = fileSystemYo.getImgUrl(img, nombreCarpeta);
    res.sendFile(pathImagen);
});
yoRutas.post('/update', autentication_1.verificarToken, (req, res) => {
    const file = req.files.img;
    fileSystemYo.guardarImagenYo(file, req.usuario.nombre);
    res.json({
        ok: true,
        mensaje: 'Imagen actualizada'
    });
});
yoRutas.delete('/:nombreCarpeta/:id/:name', autentication_1.verificarToken, (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    const nombreCarpeta = req.params.nombreCarpeta;
    imagenesYo_1.Imgyo.findByIdAndRemove(id, { new: true }, (err, imgBorrar) => {
        if (err)
            throw err;
        res.json({
            ok: true,
            mensaje: 'Imagen borrada',
            body: imgBorrar
        });
        fs_1.default.unlinkSync(path_1.default.resolve(__dirname, `../upload/${nombreCarpeta}`, name));
    });
});
exports.default = yoRutas;

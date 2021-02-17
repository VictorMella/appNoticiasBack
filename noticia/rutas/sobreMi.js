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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autentication_1 = require("../middelwares/autentication");
const sobreMi_1 = require("../models/sobreMi");
const sobreMiRutas = express_1.Router();
// CREAR SOBREMI
sobreMiRutas.post('/', autentication_1.verificarToken, (req, res) => {
    const body = req.body;
    body.titulo = 'Victor Mella Quilodran';
    sobreMi_1.SobreMi.create(body)
        .then(sobreMiBD => {
        res.json({
            ok: true,
            sobreMi: sobreMiBD
        });
    })
        .catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
// ACTUALIZAR SOBREMI
sobreMiRutas.post('/update/:id', autentication_1.verificarToken, (req, res) => {
    const id = req.params.id;
    const sobreMi = {
        texto1: req.body.texto1,
        texto2: req.body.texto2,
        texto3: req.body.texto3,
        texto4: req.body.texto4,
        texto5: req.body.texto5
    };
    sobreMi_1.SobreMi.findByIdAndUpdate(id, sobreMi, { new: true }, (err, sobreMiBD) => {
        if (err)
            throw err;
        if (!sobreMiBD) {
            return res.json({
                ok: false,
                mensaje: 'Datos incorrectos'
            });
        }
        res.json({
            ok: true,
            sobreMiBD
        });
    });
});
// Get SOBREMI
sobreMiRutas.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sobreMiBD = yield sobreMi_1.SobreMi.find()
        .sort({ _id: -1 })
        .limit(10) // Limit es para el número de usuarios que queremos obtener
        .exec();
    res.json({
        ok: true,
        sobreMiBD
    });
}));
exports.default = sobreMiRutas;

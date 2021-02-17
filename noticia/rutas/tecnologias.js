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
const tecnologias_1 = require("../models/tecnologias");
const tecnologiasRutas = express_1.Router();
// CREAR TECNOLOGIAS
tecnologiasRutas.post('/', autentication_1.verificarToken, (req, res) => {
    const body = req.body;
    tecnologias_1.Tecnologias.create(body)
        .then(tecnologiaBD => {
        res.json({
            ok: true,
            tecnologia: tecnologiaBD
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
tecnologiasRutas.post('/update/:id', autentication_1.verificarToken, (req, res) => {
    const id = req.params.id;
    const sobreMi = {
        icono: req.body.icono,
        tecnologia: req.body.tecnologia,
        experiencia: req.body.experiencia,
    };
    tecnologias_1.Tecnologias.findByIdAndUpdate(id, sobreMi, { new: true }, (err, tecnologiaBD) => {
        if (err)
            throw err;
        if (!tecnologiaBD) {
            return res.json({
                ok: false,
                mensaje: 'Datos incorrectos'
            });
        }
        res.json({
            ok: true,
            tecnologiaBD
        });
    });
});
// BORRAR TECNOLOGIAS
tecnologiasRutas.delete('/:id', (req, res) => {
    const id = req.params.id;
    tecnologias_1.Tecnologias.findByIdAndRemove(id, { new: true }, (err, tecnologiaBD) => {
        if (err)
            throw err;
        res.json({
            ok: true,
            mensaje: 'Tecnologia borrada',
            body: tecnologiaBD
        });
    });
});
// Get TECNOLOGIAS
tecnologiasRutas.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tecnologiaBD = yield tecnologias_1.Tecnologias.find()
        .limit(10) // Limit es para el número de usuarios que queremos obtener
        .exec();
    res.json({
        ok: true,
        tecnologiaBD
    });
}));
exports.default = tecnologiasRutas;

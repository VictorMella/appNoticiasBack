"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contacto_1 = require("../models/contacto");
const contactoRutas = express_1.Router();
// CREAR MENSAJES
contactoRutas.post('/', (req, res) => {
    const body = req.body;
    contacto_1.Contacto.create(body)
        .then(contactoBD => {
        res.json({
            ok: true,
            contacto: contactoBD
        });
    })
        .catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
// BOIRRAR MENSAJES
contactoRutas.delete('/:id', (req, res) => {
    const id = req.params.id;
    contacto_1.Contacto.findByIdAndRemove(id, { new: true }, (err, contactoBorrar) => {
        if (err)
            throw err;
        res.json({
            ok: true,
            mensaje: 'Mensaje borrado',
            body: contactoBorrar
        });
    });
});
exports.default = contactoRutas;

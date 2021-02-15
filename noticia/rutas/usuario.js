"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioRutas = express_1.Router();
//CREAR USUARIO
usuarioRutas.post('/crear', (req, res) => {
    const usuario = {
        nombre: req.params.nombre,
        password: req.params.password
    };
    res.json({
        ok: true,
        usuario
    });
});
exports.default = usuarioRutas;

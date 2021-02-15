"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = __importDefault(require("../clases/token"));
const usuario_1 = require("../models/usuario");
const bcrypt = require('bcrypt');
const usuarioRutas = express_1.Router();
//CREAR USUARIO
usuarioRutas.post('/crear', (req, res) => {
    const usuario = {
        nombre: req.body.nombre,
        password: bcrypt.hashSync(req.body.password, 10)
    };
    // res.json({
    //     ok: true,
    //     usuario
    // })
    //Grabar Usuario
    console.log(usuario);
    usuario_1.Usuario.create(usuario)
        .then(userBD => {
        res.json({
            ok: true,
            usuario: userBD
        });
    })
        .catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
// LOGIN
usuarioRutas.post('/entrar', (req, res) => {
    const body = req.body;
    usuario_1.Usuario.findOne({ nombre: body.nombre }, (err, usuarioBD) => {
        if (err) {
            console.log(err);
        }
        console.log(usuarioBD);
        if (!usuarioBD) {
            return res.json({
                ok: false,
                mensaje: 'Datos incorrectos'
            });
        }
        if (usuarioBD.compararContrasena(body.password)) {
            const miToken = token_1.default.getToken({
                _id: usuarioBD._id,
                nombre: usuarioBD.nombre,
                password: usuarioBD.password,
            });
            res.json({
                ok: true,
                token: miToken
            });
        }
    });
});
exports.default = usuarioRutas;

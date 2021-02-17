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
const token_1 = __importDefault(require("../clases/token"));
const autentication_1 = require("../middelwares/autentication");
const usuario_1 = require("../models/usuario");
const bcrypt = require('bcrypt');
const usuarioRutas = express_1.Router();
//CREAR USUARIO
usuarioRutas.post('/crear', (req, res) => {
    const usuario = {
        nombre: req.body.nombre,
        password: bcrypt.hashSync(req.body.password, 10)
    };
    //Grabar Usuario
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
        if (err)
            throw err;
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
        else {
            return res.json({
                ok: false,
                mensaje: 'Datos incorrectos'
            });
        }
    });
});
// Actualizar mi usuario
usuarioRutas.post('/update', autentication_1.verificarToken, (req, res) => {
    const usuario = {
        nombre: req.body.nombre || req.usuario.nombre,
        password: req.body.password || req.usuario.password
    };
    usuario_1.Usuario.findByIdAndUpdate(req.usuario._id, usuario, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Datos incorrectos'
            });
        }
        const miToken = token_1.default.getToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            password: userDB.password
        });
        res.json({
            ok: true,
            token: miToken
        });
    });
});
// Get usuario
usuarioRutas.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usuario_1.Usuario.find()
        .limit(10) // Limit es para el número de usuarios que queremos obtener
        .exec();
    res.json({
        ok: true,
        user
    });
}));
exports.default = usuarioRutas;

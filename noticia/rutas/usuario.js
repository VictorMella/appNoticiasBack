"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioRutas = express_1.Router();
//CREAR USUARIO
usuarioRutas.post('/crear', (req, res) => {
    const usuario = {
        // nombre: 'victor',
        // password: '1234'
        nombre: req.body.nombre,
        password: req.body.password
    };
    console.dir(req.body);
    res.json({
        ok: true,
        usuario
    });
    console.log(req.body); // the posted data
    // res.json({requestBody: req.body}) 
    //Grabar Usuario
    // Usuario.create(usuario)
    //     .then(userBD => {
    //         res.json({
    //             ok: true,
    //             usuario: userBD
    //         })
    //     })
});
exports.default = usuarioRutas;

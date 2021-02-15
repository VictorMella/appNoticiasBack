import { Router, Request, Response } from 'express'
import Token from '../clases/token'
import { Usuario } from '../models/usuario'
const bcrypt = require('bcrypt')

const usuarioRutas = Router()

//CREAR USUARIO

usuarioRutas.post('/crear', (req: Request, res: Response) => {

    const usuario = {
        nombre: req.body.nombre,
        password: bcrypt.hashSync(req.body.password, 10)
    }
    // res.json({
    //     ok: true,
    //     usuario
    // })

    //Grabar Usuario
    console.log(usuario)
    Usuario.create(usuario)
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
        })
})

// LOGIN
usuarioRutas.post('/entrar', (req: Request, res: Response) => {
    const body = req.body

    Usuario.findOne({ nombre: body.nombre }, (err, usuarioBD) => {
        if (err) {
            console.log(err)
        }
        console.log(usuarioBD)
        if (!usuarioBD) {
            return res.json({
                ok: false,
                mensaje: 'Datos incorrectos'
            })
        }

        if (usuarioBD.compararContrasena(body.password)) {
            const miToken = Token.getToken({
                _id: usuarioBD._id,
                nombre: usuarioBD.nombre,
                password: usuarioBD.password,
            })
            res.json({
                ok: true,
                token: miToken
            })
        }
    })


})

export default usuarioRutas


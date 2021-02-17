import { Router, Request, Response } from 'express'
import Token from '../clases/token'
import { verificarToken } from '../middelwares/autentication'
import { Usuario } from '../models/usuario'
const bcrypt = require('bcrypt')

const usuarioRutas = Router()

//CREAR USUARIO

usuarioRutas.post('/crear', (req: Request, res: Response) => {

    const usuario = {
        nombre: req.body.nombre,
        password: bcrypt.hashSync(req.body.password, 10)
    }

    //Grabar Usuario
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
        if (err) throw err;
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
        }else{
            return res.json({
                ok: false,
                mensaje: 'Datos incorrectos'
            })
        }
    })
})

// Actualizar mi usuario
usuarioRutas.post('/update', verificarToken, (req: any, res: Response) => {

    const usuario = {
        nombre: req.body.nombre || req.usuario.nombre,
        password: req.body.password || req.usuario.password
    }

    Usuario.findByIdAndUpdate(req.usuario._id, usuario, { new: true }, (err, userDB) => {

        if (err) throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Datos incorrectos'
            });
        }
        const miToken = Token.getToken({
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
usuarioRutas.get('/', async (req: any, res: Response) => {

    const user = await Usuario.find()
        .limit(10) // Limit es para el número de usuarios que queremos obtener
        .exec();

    res.json({
        ok: true,
        user
    });
});

export default usuarioRutas


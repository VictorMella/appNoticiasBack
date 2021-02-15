import { Router, Request, Response } from 'express'
import { Usuario } from '../models/usuario'

const usuarioRutas = Router()

//CREAR USUARIO

usuarioRutas.post('/crear', (req: Request, res: Response) => {

    const usuario = {
        // nombre: 'victor',
        // password: '1234'
        nombre: req.body.nombre,
        password: req.body.password
    }
    console.dir(req.body);
    res.json({
        ok: true,
        usuario
 
    })
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
})

export default usuarioRutas
import { Router, Request, Response } from 'express'

const usuarioRutas = Router()

//CREAR USUARIO

usuarioRutas.post('/crear', (req: Request, res: Response) => {
    const usuario = {
        nombre: req.params.nombre,
        password: req.params.password
    }
    res.json({
        ok: true,
        usuario
    })
})

export default usuarioRutas
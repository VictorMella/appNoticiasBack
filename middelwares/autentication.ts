import { Response, NextFunction, response } from 'express'
import Token from '../clases/token'

export const verificarToken = (req:any, res: Response, next: NextFunction) => {
    const usuarioTeken = req.get('miToken')|| '';
    Token.comprobarToken(usuarioTeken)
    .then((decoded: any) => {
        req.usuario = decoded.usuario
        next()
    })
    .catch(err => {
        res.json({
            ok: false,
            mensaje: 'Token no válido',
            err
        })
    })
}
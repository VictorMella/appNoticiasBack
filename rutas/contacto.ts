import { Router, Request, Response } from 'express'
import { Contacto } from '../models/contacto'

const contactoRutas = Router()

// CREAR MENSAJES

contactoRutas.post('/', (req: Request, res: Response) => {
    const body = req.body
    Contacto.create(body)
        .then(contactoBD => {
            res.json({
                ok: true,
                contacto: contactoBD
            })
        })
        .catch(err => {
            res.json({
                ok: false,
                err
            })
        })
})

// BOIRRAR MENSAJES
contactoRutas.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id
    Contacto.findByIdAndRemove(id, { new: true }, (err, contactoBorrar) => {
        if (err) throw err
        res.json({
            ok: true,
            mensaje: 'Mensaje borrado',
            body: contactoBorrar
        })
    })
})

// Get SOBREMI
contactoRutas.get('/', async (req: any, res: Response) => {

    const mensajes = await Contacto.find()
        .sort({ _id: -1 })
        .limit(30) // Limit es para el número de usuarios que queremos obtener
        .exec()
    const totalMensajes = await Contacto.find()    
        .exec()

    res.json({
        ok: true,
        totalRegistros: totalMensajes.length,
        mensajes
    })
})

export default contactoRutas
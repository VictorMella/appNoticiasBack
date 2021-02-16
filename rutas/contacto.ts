import { Router, Request, Response } from 'express'
import { Contacto } from '../models/contacto'

const contactoRutas = Router();

// CREAR MENSAJES

contactoRutas.post('/', (req: Request, res: Response) => {
    const body = req.body;
    Contacto.create(body)
    .then(contactoBD => {
        res.json({
            ok: true,
            contacto: contactoBD
        });
    })
    .catch(err => {
        res.json({
            ok: false,
            err
        });
    })
})

// BOIRRAR MENSAJES
contactoRutas.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    Contacto.findByIdAndRemove(id, { new: true }, (err, contactoBorrar) => {
        if(err) throw err;
        res.json({
            ok: true,
            mensaje: 'Mensaje borrado',
            body: contactoBorrar
        })
    })
 
})

export default contactoRutas
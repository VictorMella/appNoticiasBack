import { Router, Request, Response } from 'express'
import { verificarToken } from '../middelwares/autentication'
import { Tecnologias } from '../models/tecnologias'

const tecnologiasRutas = Router();

// CREAR TECNOLOGIAS

tecnologiasRutas.post('/', verificarToken, (req: Request, res: Response) => {
    const body = req.body

    Tecnologias.create(body)
        .then(tecnologiaBD => {
            res.json({
                ok: true,
                tecnologia: tecnologiaBD
            })
        })
        .catch(err => {
            res.json({
                ok: false,
                err
            })
        })
})

// ACTUALIZAR SOBREMI
tecnologiasRutas.post('/update/:id', verificarToken, (req: Request, res: Response) => {
    const id = req.params.id
    const sobreMi = {
        icono: req.body.icono,
        tecnologia: req.body.tecnologia,
        experiencia: req.body.experiencia,
    }

    Tecnologias.findByIdAndUpdate(id, sobreMi, { new: true }, (err, tecnologiaBD) => {
        if (err) throw err
        if (!tecnologiaBD) {
            return res.json({
                ok: false,
                mensaje: 'Datos incorrectos'
            })
        }
        res.json({
            ok: true,
            tecnologiaBD
        })
    })
})

// BORRAR TECNOLOGIAS
tecnologiasRutas.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    Tecnologias.findByIdAndRemove(id, { new: true }, (err, tecnologiaBD) => {
        if(err) throw err;
        res.json({
            ok: true,
            mensaje: 'Tecnologia borrada',
            body: tecnologiaBD
        })
    }) 
})

// Get TECNOLOGIAS
tecnologiasRutas.get('/', async (req: any, res: Response) => {
    const tecnologiaBD = await Tecnologias.find()      
        .limit(10) // Limit es para el número de usuarios que queremos obtener
        .exec();

    res.json({
        ok: true,
        tecnologiaBD
    });
});

export default tecnologiasRutas
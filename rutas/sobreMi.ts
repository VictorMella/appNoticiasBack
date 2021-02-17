import { Router, Request, Response } from 'express'
import { verificarToken } from '../middelwares/autentication'
import { SobreMi } from '../models/sobreMi'


const sobreMiRutas = Router()

// CREAR SOBREMI
sobreMiRutas.post('/', verificarToken, (req: Request, res: Response) => {
    const body = req.body
    body.titulo = 'Victor Mella Quilodran'
    SobreMi.create(body)
        .then(sobreMiBD => {
            res.json({
                ok: true,
                sobreMi: sobreMiBD
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
sobreMiRutas.post('/update/:id', verificarToken, (req: Request, res: Response) => {
    const id = req.params.id
    const sobreMi = {
        texto1: req.body.texto1,
        texto2: req.body.texto2,
        texto3: req.body.texto3,
        texto4: req.body.texto4,
        texto5: req.body.texto5
    }

    SobreMi.findByIdAndUpdate(id, sobreMi, { new: true }, (err, sobreMiBD) => {
        if (err) throw err
        if (!sobreMiBD) {
            return res.json({
                ok: false,
                mensaje: 'Datos incorrectos'
            })
        }
        res.json({
            ok: true,
            sobreMiBD
        })
    })
})

// Get SOBREMI
sobreMiRutas.get('/', async (req: any, res: Response) => {

    const sobreMiBD = await SobreMi.find()
        .sort({_id: -1})
        .limit(10) // Limit es para el número de usuarios que queremos obtener
        .exec();

    res.json({
        ok: true,
        sobreMiBD
    });
});

export default sobreMiRutas
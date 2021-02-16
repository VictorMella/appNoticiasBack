import { Router, Request, Response } from 'express'
import FileSystemYo from '../clases/fileSystemYo'
import { verificarToken } from '../middelwares/autentication'
import { Imgyo } from '../models/imagenesYo'


const yoRutas = Router();
const fileSystemYo = new FileSystemYo()

// SUBIR IMAGENES
yoRutas.post('/', verificarToken, (req: any, res: Response) => {
    const body = req.body
    const file = req.files.img;
    body.img = file.name;

    Imgyo.create(body)
    .then(imgYoBD => {
        res.json({
            ok: true,
            imgYoBD
        })
       
    })
    .then(()=> {
        fileSystemYo.guardarImagenYo(file, req.usuario.nombre)
    })
    .catch(err => {
       res.json({
           err
       })
    })

})

export default yoRutas
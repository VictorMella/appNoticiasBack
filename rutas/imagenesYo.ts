import { Router, Request, Response } from 'express'
import FileSystemYo from '../clases/fileSystemYo'
import { verificarToken } from '../middelwares/autentication'
import { Imgyo } from '../models/imagenesYo'
import fs from 'fs'
import path from 'path'


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

// MOSTRAR IMAGEN POR URL
yoRutas.get('/victorMella/:img/:nombreCarpeta', (req: any, res: Response) => {    
    const img = req.params.img;
    const nombreCarpeta = req.params.nombreCarpeta;
    const pathImagen = fileSystemYo.getImgUrl(img, nombreCarpeta);
    res.sendFile(pathImagen)
})

yoRutas.post('/update',verificarToken, (req: any, res: Response) => {
    const file = req.files.img;
    fileSystemYo.guardarImagenYo(file, req.usuario.nombre)
    res.json({
        ok: true,
        mensaje:'Imagen actualizada'
    });
})

yoRutas.delete('/:nombreCarpeta/:id/:name',verificarToken, (req: any, res: Response) => {
    const id = req.params.id;
    const name = req.params.name;
    const nombreCarpeta = req.params.nombreCarpeta;
    Imgyo.findByIdAndRemove(id, { new: true }, (err, imgBorrar) => {
        if(err) throw err;
        res.json({
            ok: true,
            mensaje: 'Imagen borrada',
            body: imgBorrar
        })

       fs.unlinkSync(path.resolve(__dirname, `../upload/${nombreCarpeta}`, name))
    })
})



export default yoRutas
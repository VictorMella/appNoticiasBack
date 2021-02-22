import { Router, Request, Response } from 'express'
import { verificarToken } from '../middelwares/autentication'
import { Noticias } from '../models/noticias'
import FileSystemNoticias from '../clases/fileSystemNoticias'
import fs from 'fs'
import path from 'path'

const noticiasRutas = Router()
const fileSystemNoticias = new FileSystemNoticias()

// Crear Noticia
noticiasRutas.post('/:imgNoticia/:imgAutor', verificarToken, (req: any, res: Response) => {
    const body = req.body
    const imgNoticia = req.params.imgNoticia
    const imgAutor = req.params.imgAutor

    body.imgNoticia = imgNoticia
    body.imgAutor = imgAutor

    Noticias.create(body)
        .then(noticiaBD => {
            res.json({
                ok: true,
                noticiaBD
            })
        })
        .catch(err => {
            res.json({
                err
            })
        })

})

// NOTICIAS PAGINADAS
noticiasRutas.get('/', async (req: any, res: Response) => {
    let pagina = Number(req.query.pagina) || 1
    let saltar = pagina - 1
    saltar = saltar * 8
    const noticias = await Noticias.find()
        .sort({_id: 1})
        .skip(saltar)
        .limit(8) // Limit es para el número de usuarios que queremos obtener
        .exec()

    res.json({
        ok: true,
        pagina,
        cantidadRegistros: noticias.length ,
        noticias
    })
})
// MOSTRAR IMAGEN POR URL
// noticiasRutas.get('/victorMella/:img/:nombreCarpeta', (req: any, res: Response) => {    
//     const img = req.params.img;
//     const nombreCarpeta = req.params.nombreCarpeta;
//     const pathImagen = fileSystemNoticias.getImgUrl(img, nombreCarpeta);
//     res.sendFile(pathImagen)
// })

// noticiasRutas.post('/update',verificarToken, (req: any, res: Response) => {
//     const file = req.files.img;
//     fileSystemNoticias.guardarImagenYo(file, req.usuario.nombre)
//     res.json({
//         ok: true,
//         mensaje:'Imagen actualizada'
//     });
// })

// noticiasRutas.delete('/:nombreCarpeta/:id/:name',verificarToken, (req: any, res: Response) => {
//     const id = req.params.id;
//     const name = req.params.name;
//     const nombreCarpeta = req.params.nombreCarpeta;
//     Noticias.findByIdAndRemove(id, { new: true }, (err, imgBorrar) => {
//         if(err) throw err;
//         res.json({
//             ok: true,
//             mensaje: 'Imagen borrada',
//             body: imgBorrar
//         })

//        fs.unlinkSync(path.resolve(__dirname, `../upload/${nombreCarpeta}`, name))
//     })
// })

export default noticiasRutas









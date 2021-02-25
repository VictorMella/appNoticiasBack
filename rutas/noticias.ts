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
        .sort({ _id: 1 })
        .skip(saltar)
        .limit(8) // Limit es para el número de usuarios que queremos obtener
        .exec()

    res.json({
        ok: true,
        pagina,
        cantidadRegistros: noticias.length,
        noticias
    })
})
// SUBIR IMAGEN AUTOR
noticiasRutas.post('/uploadImgAutor', verificarToken, async (req: any, res: Response) => {
    const file1 = req.files.imgAutor
    await fileSystemNoticias.guardarImgAutor(file1)

    res.json({
        ok: true,
        file1: file1.name
    })
})


// SUBIR IMAGEN NOTICIA
noticiasRutas.post('/uploadImgNoticia', verificarToken, async (req: any, res: Response) => {
    const file1 = req.files.imgNoticia
    await fileSystemNoticias.guardarImgNoticia(file1)

    res.json({
        ok: true,
        file1: file1.name
    })
})

// MOSTRAR IMAGEN NOTICIA POR URL
noticiasRutas.get('/imgNoticia/:imgNoticia', (req: any, res: Response) => {
    const img = req.params.imgNoticia
    const pathImagen = fileSystemNoticias.getImgUrlNoticia(img)
    res.sendFile(pathImagen)
})

// MOSTRAR IMAGEN AUTOR POR URL
noticiasRutas.get('/imgAutor/:imgAutor', (req: any, res: Response) => {
    const img = req.params.imgAutor
    const pathImagen = fileSystemNoticias.getImgUrlAutor(img)
    res.sendFile(pathImagen)
})


export default noticiasRutas









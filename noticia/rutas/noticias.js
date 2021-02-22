"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autentication_1 = require("../middelwares/autentication");
const noticias_1 = require("../models/noticias");
const fileSystemNoticias_1 = __importDefault(require("../clases/fileSystemNoticias"));
const noticiasRutas = express_1.Router();
const fileSystemNoticias = new fileSystemNoticias_1.default();
// Crear Noticia
noticiasRutas.post('/:imgNoticia/:imgAutor', autentication_1.verificarToken, (req, res) => {
    const body = req.body;
    const imgNoticia = req.params.imgNoticia;
    const imgAutor = req.params.imgAutor;
    body.imgNoticia = imgNoticia;
    body.imgAutor = imgAutor;
    noticias_1.Noticias.create(body)
        .then(noticiaBD => {
        res.json({
            ok: true,
            noticiaBD
        });
    })
        .catch(err => {
        res.json({
            err
        });
    });
});
// NOTICIAS PAGINADAS
noticiasRutas.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let saltar = pagina - 1;
    saltar = saltar * 8;
    const noticias = yield noticias_1.Noticias.find()
        .sort({ _id: 1 })
        .skip(saltar)
        .limit(8) // Limit es para el número de usuarios que queremos obtener
        .exec();
    res.json({
        ok: true,
        pagina,
        cantidadRegistros: noticias.length,
        noticias
    });
}));
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
exports.default = noticiasRutas;

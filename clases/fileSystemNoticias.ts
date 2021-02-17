import path from 'path'
import fs from 'fs'

export default class FileSystemNoticias {
    constructor() { }

    guardarImg(file: any) {
        return new Promise((resolve, reject) => {
            // CREAR CARPETA
            const path = this.crearCarpetaImagenNoticia()
            // NOMBRE DEL ARCHIVO
            const nombreArchivo = file.name;
            // MOVER ARCHIVO
            file.mv(`${path}/${nombreArchivo}`, (err: any) => {
                if(err){
                    reject();
                }else{
                    const mensaje = 'Archivo cuardado correctamente'
                    resolve(mensaje);
                }
            })
        })
    }

    private crearCarpetaImagenNoticia(){
        const pathImagenNoticia = path.resolve(__dirname, '../upload/imgNoticia')
        const existe = fs.existsSync(pathImagenNoticia)
        if(!existe){
            fs.mkdirSync(pathImagenNoticia)
        }

        return pathImagenNoticia
    }

    getImgUrl(img: string){
        const pathImgNoticia = path.resolve(__dirname, '../upload', 'imgNoticia', img)
        return pathImgNoticia
    }

    // IMAGEN AUTOR
    guardarImgYo(file: any) {
        return new Promise((resolve, reject) => {
            // CREAR CARPETA
            const path = this.crearCarpetaImagenYo()
            // NOMBRE DEL ARCHIVO
            const nombreArchivo = file.name;
            // MOVER ARCHIVO
            file.mv(`${path}/${nombreArchivo}`, (err: any) => {
                if(err){
                    reject();
                }else{
                    const mensaje = 'Archivo cuardado correctamente'
                    resolve(mensaje);
                }
            })
        })
    }

    private crearCarpetaImagenYo(){
        const pathImagenAutor = path.resolve(__dirname, '../upload/imgAutor')
        const existe = fs.existsSync(pathImagenAutor)
        if(!existe){
            fs.mkdirSync(pathImagenAutor)
        }

        return pathImagenAutor
    }

    getImgUrlYo(img: string){
        const pathImagenAutor = path.resolve(__dirname, '../upload', 'imgAutor', img)
        return pathImagenAutor
    }



}
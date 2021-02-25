import path from 'path'
import fs from 'fs'
export default class FileSystemYo {
    constructor() { }

    guardarImagenYo(file: any, nombre: string) {
        return new Promise((resolve, reject) => {
            // CREAR CARPETA
            const path = this.crearCarpeta(nombre)
            // NOMBRE DEL ARCHIVO
            const nombreArchivo = file.name
            // MOVER ARCHIVO
            file.mv(`${path}/${nombreArchivo}`, (err: any) => {
                if (err) {
                    reject()
                } else {
                    const mensaje = 'Archivo cuardado correctamente'
                    resolve(mensaje)
                }
            })
        })
    }

    private crearCarpeta(nombre: string) {
        const pathYo = path.resolve(__dirname, '../upload', nombre)
        const existe = fs.existsSync(pathYo)
        if (!existe) {
            fs.mkdirSync(pathYo)
        }

        return pathYo
    }

    getImgUrl(img: string, nombreCarpeta: string) {
        const pathImagen = path.resolve(__dirname, `../upload/${nombreCarpeta}`, img)
        return pathImagen
    }


}
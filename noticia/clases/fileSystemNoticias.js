"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileSystemNoticias {
    constructor() { }
    guardarImgNoticia(file) {
        return new Promise((resolve, reject) => {
            // CREAR CARPETA
            const path = this.crearCarpetaImagenNoticia();
            // NOMBRE DEL ARCHIVO
            const nombreArchivo = file.name;
            // MOVER ARCHIVO
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject();
                }
                else {
                    const mensaje = 'Archivo cuardado correctamente';
                    resolve(mensaje);
                }
            });
        });
    }
    crearCarpetaImagenNoticia() {
        const pathImagenNoticia = path_1.default.resolve(__dirname, '../upload/imgNoticia');
        const existe = fs_1.default.existsSync(pathImagenNoticia);
        if (!existe) {
            fs_1.default.mkdirSync(pathImagenNoticia);
        }
        return pathImagenNoticia;
    }
    getImgUrlNoticia(img) {
        const pathImgNoticia = path_1.default.resolve(__dirname, '../upload', 'imgNoticia', img);
        return pathImgNoticia;
    }
    // IMAGEN AUTOR
    guardarImgAutor(file) {
        return new Promise((resolve, reject) => {
            // CREAR CARPETA
            const path = this.crearCarpetaImagenYo();
            // NOMBRE DEL ARCHIVO
            const nombreArchivo = file.name;
            // MOVER ARCHIVO
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject();
                }
                else {
                    const mensaje = 'Archivo cuardado correctamente';
                    resolve(mensaje);
                }
            });
        });
    }
    crearCarpetaImagenYo() {
        const pathImagenAutor = path_1.default.resolve(__dirname, '../upload/imgAutor');
        const existe = fs_1.default.existsSync(pathImagenAutor);
        if (!existe) {
            fs_1.default.mkdirSync(pathImagenAutor);
        }
        return pathImagenAutor;
    }
    getImgUrlAutor(img) {
        const pathImagenAutor = path_1.default.resolve(__dirname, '../upload', 'imgAutor', img);
        return pathImagenAutor;
    }
}
exports.default = FileSystemNoticias;

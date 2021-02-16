"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileSystemYo {
    constructor() { }
    guardarImagenYo(file, nombre) {
        return new Promise((resolve, reject) => {
            // CREAR CARPETA
            const path = this.crearCarpeta(nombre);
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
    crearCarpeta(nombre) {
        const pathYo = path_1.default.resolve(__dirname, '../upload', nombre);
        const existe = fs_1.default.existsSync(pathYo);
        if (!existe) {
            fs_1.default.mkdirSync(pathYo);
        }
        return pathYo;
    }
    getImgUrl(img, nombreCarpeta) {
        const pathImagen = path_1.default.resolve(__dirname, `../upload/${nombreCarpeta}`, img);
        return pathImagen;
    }
}
exports.default = FileSystemYo;

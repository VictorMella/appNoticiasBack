import { Schema, model, Document } from 'mongoose'
const bcrypt = require('bcrypt')

interface IYo extends Document {
    nombre: string
    password: string
    compararContrasena(password: string): boolean
}

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es obligatorio']
    },
    password: {
        type: String,
        unique: true,
        required: [true, 'La contraseña es obligatoria']
    }
})

usuarioSchema.method('compararContrasena', function (password: string = ''): boolean {

    if (bcrypt.compareSync(password, this.password)) {
        return true
    } else {
        return false
    }
})

export const Usuario = model<IYo>('Usuario', usuarioSchema)
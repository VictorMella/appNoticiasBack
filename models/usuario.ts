import {Schema, model, Document} from 'mongoose'

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required:[true, 'El nombre es obligatorio']
    },
    password: {
        type: String,
        unique: true,
        required:[true, 'El password es obligatoria']
    }
})

interface iYo extends Document {
    nombre : string,
    password: string
}

export const Usuario = model<iYo>('Usuario', usuarioSchema)
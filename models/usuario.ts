import { Schema, model, Document } from 'mongoose';

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
});
interface IYo extends Document {
    nombre: string;
    password: string;
}

export const Usuario = model<IYo>('Usuario', usuarioSchema)
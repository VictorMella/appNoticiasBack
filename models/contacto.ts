import { Schema, model, Document } from 'mongoose'

const contactoSchema = new Schema({
    created: {
        type: Date
    },
    email: {
        type: String,
        required: [true, 'El email es obligatoria']
    },
    mensaje: {
        type: String,
        required: [true, 'El mensaje es obligatoria']
    }
})

contactoSchema.pre<IContacto>('save', function(next) {
    this.created = new Date();
    next();
})

interface IContacto extends Document {
    created: Date
    email: string
    mensaje: string
}

export const Contacto = model<IContacto>('Contacto', contactoSchema)
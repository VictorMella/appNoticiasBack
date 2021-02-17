import { Schema, model, Document } from 'mongoose'

const tecnologiaSchema = new Schema({
    icono: {
        type: String,
        required: [true, 'El ícono es obligatorio']
    },
    tecnologia: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    experiancia: {
        type: String,
        required: [true, 'La experencia es obligatoria']
    }
})

interface ITecnologia extends Document {
    icono: string
    tecnologia: string
    experiancia: string
}

export const Tecnologias = model<ITecnologia>('Tecnologias', tecnologiaSchema)
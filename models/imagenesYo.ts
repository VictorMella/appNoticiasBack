import { Schema, model, Document } from 'mongoose'

interface IImg extends Document {
    img: string
}

const imagenesYoSchema = new Schema({
    img: {
        type: String,
        unique: true
    },
})

export const Imgyo = model<IImg>('Imgyo', imagenesYoSchema)
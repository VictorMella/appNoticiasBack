import { Schema, model, Document } from 'mongoose'

interface INoticias extends Document {
    created: Date
    titulo: string
    subtitulo: string
    autor: string
    imgNoticia: string
    imgAutor: string
    texto1: string
    texto2: string
    texto3: string
    texto4: string
    texto5: string
}

const noticiasSchema = new Schema({
    created: {
        type: Date
    },
    titulo: {
        type: String,
    },
    subtitulo: {
        type: String,
    },
    autor: {
        type: String
    },
    imgNoticia: {
        type: String
    },
    imgAutor: {
        type: String
    },
    texto1: {
        type: String,
    },
    texto2: {
        type: String,
    },
    texto3: {
        type: String,
    },
    texto4: {
        type: String,
    },
    texto5: {
        type: String,
    },
})

noticiasSchema.pre<INoticias>('save', function(next) {
    this.created = new Date();
    next();
})

export const Noticias = model<INoticias>('Noticias', noticiasSchema)
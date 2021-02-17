"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const noticiasSchema = new mongoose_1.Schema({
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
});
noticiasSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Noticias = mongoose_1.model('Noticias', noticiasSchema);

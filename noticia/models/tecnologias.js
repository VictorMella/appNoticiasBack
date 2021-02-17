"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tecnologiaSchema = new mongoose_1.Schema({
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
});
exports.Tecnologias = mongoose_1.model('Tecnologias', tecnologiaSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const imagenesYoSchema = new mongoose_1.Schema({
    img: {
        type: String,
        unique: true
    },
});
exports.Imgyo = mongoose_1.model('Imgyo', imagenesYoSchema);

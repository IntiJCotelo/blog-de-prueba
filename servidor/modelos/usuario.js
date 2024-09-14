const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    facebookId: { type: String, unique: true },
    publicaciones: [{ type: Schema.Types.ObjectId, ref: 'Publicacion' }]
});

module.exports = mongoose.model('Usuario', usuarioSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: String,
    email: String,
    imagen: String,
    esAdmin: { type: Boolean, default: false },
    googleId: { type: String, unique: true },
    publicaciones: [{ type: Schema.Types.ObjectId, ref: 'Publicacion' }],
    comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Publicacion' }],
});

module.exports = mongoose.model('Usuario', usuarioSchema)
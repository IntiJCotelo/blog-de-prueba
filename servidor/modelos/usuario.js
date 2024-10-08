const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: String,
    email: String,
    // password: String,
    imagen: String,
    googleId: { type: String, unique: true },
    publicaciones: [{ type: Schema.Types.ObjectId, ref: 'Publicacion' }],
    comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario' }]
});

module.exports = mongoose.model('Usuario', usuarioSchema)
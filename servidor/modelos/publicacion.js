const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicacionSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    titulo: String,
    texto: String,
    comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
});

module.exports = mongoose.model('Publicacion', publicacionSchema)
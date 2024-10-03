const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    publicacion: { type: Schema.Types.ObjectId, ref: 'Publicacion' },
    texto: String
});

module.exports = mongoose.model('Comentario', comentarioSchema)
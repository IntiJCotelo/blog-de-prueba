const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: String,
    email: String,
    password: String,
    googleId: { type: String, unique: true }, //facebookId: { type: String, unique: true },
    //publicaciones: [{ type: Schema.Types.ObjectId, ref: 'Publicacion' }]
});

module.exports = mongoose.model('Usuario', usuarioSchema)
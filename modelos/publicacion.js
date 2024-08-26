const mongoogse = require('mongoose');
const Schema = mongoogse.Schema;

const publicacionSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    titulo: String,
    texto: String,
    // likes: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }]
});

module.exports = mongoose.model('Publicacion', publicacionSchema)
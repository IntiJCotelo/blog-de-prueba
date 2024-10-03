const Comentario = require('../modelos/comentario');
const Usuario = require('../modelos/usuario');
const Publicacion = require('../modelos/publicacion');

const crearComentario = async (req, res) => {
    const { usuario, publicacion, texto } = req.body;
    const nuevoComentario = new Comentario({ usuario, publicacion, texto });
    await nuevoComentario.save();
    
    const usuarioActual = await Usuario.findById(usuario);
    usuarioActual.comentarios.push(nuevoComentario);
    await usuarioActual.save();

    const publicacionActual = await Publicacion.findById(publicacion);
    publicacionActual.comentarios.push(nuevoComentario);
    await publicacionActual.save();

    res.json({ nuevoComentario, mensaje: "Comentario creado" });
}

const eliminarComentario = async (req, res) => {
    const { id } = req.params;
    const comentario = await Comentario.findByIdAndDelete(id);

    const usuario = await Usuario.findById(comentario.usuario);
    usuario.comentarios = usuario.comentarios.filter(
        (comentarioId) => comentarioId.toString() !== id
    );
    await usuario.save();
    
    const publicacion = await Publicacion.findById(comentario.publicacion);
    publicacion.comentarios = publicacion.comentarios.filter(
        (comentarioId) => comentarioId.toString() !== id
    );
    await publicacion.save();

    res.json({ comentario, mensaje: "Comentario eliminado" });
}

const editarComentario = async (req, res) => {
    const { id } = req.params;
    const { texto } = req.body;
    const comentario = await Comentario.findByIdAndUpdate(id, { texto });
    res.json({ comentario, mensaje: "Comentario actualizado" });
}


module.exports = {
    crearComentario,
    eliminarComentario,
    editarComentario
}

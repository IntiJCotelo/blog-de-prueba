const Usuario = require('./modelos/usuario');
const Publicacion = require('./modelos/publicacion');
const Comentarios = require('./modelos/comentario');

const estaLogeado = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).json({ msg: "No has iniciado sesión" });
    }
}

const esAutorPublicacion = async (req, res, next) => {
    const { id } = req.params;
    const publicacion = await Publicacion.findById(id);
    if (
        publicacion.usuario.toString() === req.user._id.toString() || 
        req.user.esAdmin
    ) {
        next();
    } else {
        res.status(403).json({ msg: "No eres el autor de esta publicación" });
    }
}

const esAutorComentario = async (req, res, next) => {
    const { id } = req.params;
    const comentario = await Comentarios.findById(id);
    if (
        (comentario.usuario.toString() === req.user._id.toString() || 
        req.user.esAdmin)
    ) {
        next();
    } else {
        res.status(403).json({ msg: "No eres el autor de este comentario" });
    }
}

const esAdmin = (req, res, next) => {
    if (req.user.esAdmin) {
        next();
    } else {
        res.status(403).json({ msg: "No eres admin" });
    }
}

const esUsuario = async (req, res, next) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    if (usuario._id === req.user._id || req.user.esAdmin) {
        next();
    } else {
        res.status(403).json({ msg: "No estás registrado como usuario" });
    }
}

module.exports = {
    estaLogeado,
    esAutorPublicacion,
    esAutorComentario,
    esAdmin,
    esUsuario
}
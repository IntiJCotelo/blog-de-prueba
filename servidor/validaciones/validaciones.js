const {
    usuarioSchema,
    publicacionSchema,
    comentarioSchema
} = require('./schemas');

const validarUsuario = (req, res, next) => {
    const { error } = usuarioSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

const validarPublicacion = (req, res, next) => {
    const { error } = publicacionSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

const validarComentario = (req, res, next) => {
    const { error } = comentarioSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = {
    validarUsuario,
    validarPublicacion,
    validarComentario
}
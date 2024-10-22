const Joi = require('joi');

const usuarioSchema = Joi.object({
    nombre: Joi.string().required(),
    email: Joi.string().email().required(),
    imagen: Joi.string(),
    esAdmin: Joi.boolean(), 
    googleId: Joi.string().required(),
    publicaciones: Joi.array(),
    comentarios: Joi.array()
});

const publicacionSchema = Joi.object({
    usuario: Joi.string().required(),
    titulo: Joi.string().required(),
    texto: Joi.string().required(),
    comentarios: Joi.array()
});

const comentarioSchema = Joi.object({
    usuario: Joi.string().required(),
    publicacion: Joi.string().required(),
    texto: Joi.string().required()
});

module.exports = { usuarioSchema, publicacionSchema, comentarioSchema }
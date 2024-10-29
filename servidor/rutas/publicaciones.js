const express = require("express");
const router = express.Router();
const {
    verPublicaciones,
    verPublicacion,
    crearPublicacion,
    editarPublicacion,
    eliminarPublicacion
} = require("../controladores/publicaciones");
const { validarPublicacion } = require("../validaciones/validaciones")
const { estaLogeado, esAutorPublicacion } = require("../middlewares")

router
    .route("/")
    .get(verPublicaciones)
    .post(estaLogeado, validarPublicacion, crearPublicacion)

router
    .route("/:id")
    .get(verPublicacion)
    .put(estaLogeado, esAutorPublicacion, editarPublicacion)
    .delete(estaLogeado, esAutorPublicacion, eliminarPublicacion)


module.exports = router
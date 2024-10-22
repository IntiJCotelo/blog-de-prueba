const express = require("express");
const router = express.Router();
const {
    crearComentario,
    eliminarComentario,
    editarComentario
} = require("../controladores/comentarios");
const { validarComentario } = require("../validaciones/validaciones")
const { estaLogeado, esAutorComentario } = require("../middlewares")

router
    .route("/")
    .post(estaLogeado, validarComentario, crearComentario)

router
    .route("/:id")
    .put(estaLogeado, esAutorComentario, editarComentario)
    .delete(estaLogeado, esAutorComentario, eliminarComentario)    

// router.post("/", crearComentario);
// router.delete("/:id", eliminarComentario);
// router.put("/:id", editarComentario);

module.exports = router;
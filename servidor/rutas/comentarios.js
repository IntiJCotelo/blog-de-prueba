const express = require("express");
const router = express.Router();
const {
    crearComentario,
    eliminarComentario,
    editarComentario
} = require("../controladores/comentarios");

router.post("/", crearComentario);
router.delete("/:id", eliminarComentario);
router.put("/:id", editarComentario);

module.exports = router;
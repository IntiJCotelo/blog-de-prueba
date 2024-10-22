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

// router.get("/", verPublicaciones);
// router.get("/:id", verPublicacion);
// router.post("/", crearPublicacion);
// router.put("/:id", editarPublicacion);
// router.delete("/:id", eliminarPublicacion);

module.exports = router
const { crearUsuario, verUsuarios } = require("../controladores/usuarios");
const express = require("express");
const router = express.Router();

router.get("/", verUsuarios);
router.post("/", crearUsuario);

module.exports = router;
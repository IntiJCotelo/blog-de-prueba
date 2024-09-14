const express = require("express");
const router = express.Router();
const passport = require("passport");
const Usuario = require("../modelos/usuario");
const {
    crearUsuario,
    verUsuarios,
    verUsuario,
    editarUsuario,
    eliminarUsuario,
    autenticarUsuario
} = require("../controladores/usuarios");

router.get ("/facebook", passport.authenticate("facebook"));

router.get("/facebook/autenticar", 
    passport.authenticate("facebook", {
        scope: ["profile"]
    }),
    autenticarUsuario
);

router.get("/", verUsuarios);
router.get("/:id", verUsuario);
router.post("/", crearUsuario);
router.put("/:id", editarUsuario);
router.delete("/:id", eliminarUsuario);

module.exports = router;
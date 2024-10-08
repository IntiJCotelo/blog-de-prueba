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
    autenticarUsuario,
    usuarioLogeado,
    desconectarUsuario
} = require("../controladores/usuarios");

router.get ("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/autenticar", 
    passport.authenticate("google", { scope: ["profile", "email"] }),
    autenticarUsuario
);

router.get("/", verUsuarios);
router.get("/usuario-logeado", usuarioLogeado)
router.get("/desconectarse", desconectarUsuario)
router.get("/:id", verUsuario);
router.post("/", crearUsuario);
router.put("/:id", editarUsuario);
router.delete("/:id", eliminarUsuario);

module.exports = router;
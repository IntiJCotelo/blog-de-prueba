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
const { validarUsuario } = require("../validaciones/validaciones");
const { estaLogeado, esAdmin, esUsuario } = require("../middlewares");

router.get (
    "/google", 
    passport.authenticate("google", 
        { scope: ["profile", "email"] }
    )
);

router.get(
    "/google/autenticar", 
    passport.authenticate("google", 
        { scope: ["profile", "email"] }
    ),
    autenticarUsuario
);

router
    .route("/")
    .get(verUsuarios)
    .post(validarUsuario, crearUsuario)

router
    .route("/:id")
    .get(verUsuario)
    .put(estaLogeado, esUsuario, editarUsuario)
    .delete(estaLogeado, esUsuario, eliminarUsuario);

router.get("/usuario-logeado", usuarioLogeado)
router.get("/desconectarse", desconectarUsuario)

// router.get("/", verUsuarios);
// router.post("/", crearUsuario);

// router.get("/:id", verUsuario);
// router.put("/:id", editarUsuario);
// router.delete("/:id", eliminarUsuario);

module.exports = router;
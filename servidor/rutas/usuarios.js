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
    desconectarUsuario,
    hacerAdmin
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

router.get("/usuario-logeado", usuarioLogeado)

router.get("/desconectarse", desconectarUsuario)

router
    .route("/hacer-admin/:id")
    .post(estaLogeado, esAdmin, hacerAdmin)

router
    .route("/:id")
    .get(verUsuario)
    .put(estaLogeado, esUsuario, editarUsuario)
    .delete(estaLogeado, esUsuario, eliminarUsuario);


module.exports = router;
const Usuario = require('../modelos/usuario')
const Publicacion = require('../modelos/publicacion');
const { authenticate } = require('passport');

const crearUsuario = async (req, res) => {
    const { nombre, password, email } = req.body;
    const usuario = new Usuario({ nombre, password, email });
    await usuario.save();
    res.json({ usuario, mensaje: "Usuario creado"});
};

const verUsuarios = async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
};

const verUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    res.json({ usuario });
};

const editarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, password, email } = req.body;
    const usuario = await Usuario.findByIdAndUpdate(id, {
        nombre,
        password,
        email
    });
    res.json({ usuario, mensaje: "Usuario actualizado" });
};

const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete(id);
    const publicaciones = await Publicacion.deleteMany({
        usuario: id
    });
    res.json({ usuario, mensaje: "Usuario eliminado" });
};

const autenticarUsuario = async (req, res) => {
    req.login(req.user, (err) => {
        if (err) {
            console.log(err);
        }

        res.redirect("http://localhost:5173/");
    });
};

module.exports= {
    crearUsuario,
    verUsuarios,
    verUsuario,
    editarUsuario,
    eliminarUsuario,
    autenticarUsuario
}
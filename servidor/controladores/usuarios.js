const Usuario = require('../modelos/usuario')
const Publicacion = require('../modelos/publicacion');
const Comentario = require('../modelos/comentario');
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
    const usuario = await Usuario.findById(id)    
        .populate('publicaciones')
        .populate('comentarios');
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
    const comentarios = await Comentario.deleteMany({
        usuario: id
    });
    req.logout((err) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ logeado: false, usuario: {}, mensaje: "Usuario eliminado" });
        }
    });
};

const autenticarUsuario = async (req, res) => {
    req.login(req.user, (err) => {
        if (err) {
            console.log(err);
        }

        res.redirect('http://localhost:5173/');
    });    
};

const usuarioLogeado = async (req, res) => {
    if (req.user) {
        const usuario = await Usuario.findById(req.user._id);
        res.json({ usuario, logeado: true });
    } else {
        res.json({ logeado: false });
    }
};

const desconectarUsuario = async (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        res.json({ logeado: false, usuario: {}, mensaje: "Usuario desconectado" });
    });
};

const hacerAdmin = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    usuario.esAdmin = true;
    await usuario.save();
    res.json({ usuario, mensaje: "Usuario administrador" });
};

module.exports= {
    crearUsuario,
    verUsuarios,
    verUsuario,
    editarUsuario,
    eliminarUsuario,
    autenticarUsuario,
    usuarioLogeado,
    desconectarUsuario,
    hacerAdmin
}
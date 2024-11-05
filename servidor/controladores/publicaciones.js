const Publicacion = require('../modelos/publicacion')
const Usuario = require('../modelos/usuario')

const crearPublicacion = async (req, res) => {
    const { usuario, titulo, texto } = req.body;
    const publicacion = new Publicacion({ usuario, titulo, texto });
    await publicacion.save();
    const usuarioActual = await Usuario.findById(usuario);
    usuarioActual.publicaciones.push(publicacion);
    await usuarioActual.save();
    res.json({ publicacion, mensaje: "Publicacion creada"});
};

const verPublicaciones = async (req, res) => {
    const publicaciones = await Publicacion.find();
    res.json(publicaciones);
};

const verPublicacion = async (req, res) => {
    const { id } = req.params;
    const publicacion = await Publicacion.findById(id)
        .populate("usuario")
        .populate({
            path: "comentarios",
            populate: {
                path: "usuario"
            }}
        );

    res.json({ publicacion });
};

const editarPublicacion = async (req, res) => {
    const { id } = req.params;
    const { titulo, texto } = req.body;
    const publicacion = await Publicacion.findByIdAndUpdate(id, {
        titulo,
        texto
    });
    res.json({ publicacion, mensaje: "Publicacion actualizada" });
};

const eliminarPublicacion = async (req, res) => {
    const { id } = req.params;
    const publicacion = await Publicacion.findByIdAndDelete(id);
    const usuario = await Usuario.findById(publicacion.usuario);
    usuario.publicaciones = usuario.publicaciones.filter(
        (publicacionId) => publicacionId.toString() !== id
    );
    await usuario.save();
    res.json({ publicacion, mensaje: "Publicacion eliminada" });
};

// const likearPublicacion = async (req, res) => {
//     const { id } = req.params;
//     if (req.user.likes.includes(id)) {
//         const publicacion = await Publicacion.findById(id);
//         publicacion.likes = publicacion.likes.filter(
//             (like) => like.toString() !== req.user._id.toString()
//         );
//         await publicacion.save();

//         const usuario = await Usuario.findById(req.user._id);
//         usuario.likes = usuario.likes.filter(
//             (like) => like.toString() !== id
//         );
//         await usuario.save();

//         res.json({ publicacion, mensaje: "Publicacion deslikeada" });
//     } else {
//         const publicacion = await Publicacion.findById(id);
//         publicacion.likes.push(req.user._id);
//         await publicacion.save();

//         const usuario = await Usuario.findById(req.user._id);
//         usuario.likes.push(id);
//         await usuario.save();

//         res.json({ publicacion, mensaje: "Publicacion likeada" });
//     }
// }

const likearPublicacion = async (req, res) => {
    const { id } = req.params;
    const publicacion = await Publicacion.findById(id);
    const usuario = await Usuario.findById(req.user._id);
    if (!publicacion.likes.includes(req.user._id)) {
        publicacion.likes.push(req.user._id);
        usuario.likes.push(publicacion._id);
        await publicacion.save();
        await usuario.save();
        res.json({ publicacion, mensaje: "Publicación likeada" });
    } else {
        publicacion.likes = publicacion.likes.filter(
        (likeId) => likeId.toString() !== req.user._id.toString()
        );
        usuario.likes = usuario.likes.filter(
        (likeId) => likeId.toString() !== publicacion._id.toString()
        );
        await publicacion.save();
        await usuario.save();
        res.json({ publicacion, mensaje: "Publicación deslikeada" });
    }    
}
module.exports = {
    verPublicaciones,
    verPublicacion,
    crearPublicacion,
    editarPublicacion,
    eliminarPublicacion, 
    likearPublicacion
}
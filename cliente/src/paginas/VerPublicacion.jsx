import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CrearComentario from "../componentes/CrearComentario";
import AccionesComentarios from "../componentes/AccionesComentarios";

function VerPublicacion({ usuarioLogeado }) {
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');
    const [usuario, setUsuario] = useState({});	
    const [comentarios, setComentarios] = useState([]);
    const [likes, setLikes] = useState([]);	
    const navigate = useNavigate();

    useEffect(() => {
        fetchPublicacion();
    }, []);
    
    const fetchPublicacion = async () => {
        const response = await fetch(`http://localhost:3000/api/publicaciones/${id}`);
        const data = await response.json();
        
        setTitulo(data.publicacion.titulo);
        setTexto(data.publicacion.texto);
        setComentarios(data.publicacion.comentarios);
        setLikes(data.publicacion.likes);
        
        await fetchDataUsuario(data.publicacion.usuario._id);
    };

    const fetchDataUsuario = async (idUsuario) => {
        const response = await fetch(`http://localhost:3000/api/usuarios/${idUsuario}`);
        const data = await response.json();
        setUsuario(data.usuario);
    }

    const botonesAcciones = () => {
        if (usuarioLogeado.logeado && usuarioLogeado.usuario._id === usuario._id) {
            return ( 
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: '20px',
                    }}
                >   
                    <Link to={`/ver-publicaciones/editar/${id}`}>
                        <button 
                            className="btn btn-secondary"
                            style={{ marginRight: '10px' }}
                            >
                            Editar
                        </button>
                    </Link>
                    <button 
                        className="btn btn-danger"
                        style={{ marginLeft: '10px' }}
                        onClick={eliminarPublicacion}
                    >
                        Eliminar
                    </button>
                </div>
            );
        }
    };

    const eliminarPublicacion = async () => {
        await fetch (`http://localhost:3000/api/publicaciones/${id}`, {
            method: 'DELETE'    
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        navigate("/");
    };

    const fetchCrearComentario = async (textoComentario) => {
        await fetch ('http://localhost:3000/api/comentarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                usuario: usuarioLogeado.usuario._id,
                publicacion: id,
                texto: textoComentario
            })
        })
        .then((res) => {
            fetchPublicacion();
        })
        .catch((err) => console.log(err));
    }
    
    const verComentarios = () => {
        if (comentarios.length === 0) {
            return (
                <h1 style={{ marginTop: '20px', marginBottom: '20px', fontSize: '15px', textAlign: 'center' }}>
                    Aún no hay comentarios en esta publicación. <br /> 
                    ¡Sé el primero en comentar!
                </h1>
            )
        } else {
            return (
                <>
                    <div className="row" style={{ marginTop: '25px' }}>
                        <div className="col-4"></div>
                        <div className="col-4" >
                            {comentarios.map((comentario, index) => (
                                <div key={index} style={{ textAlign: 'left' }} >
                                    <img
                                        style={{ width: '30px', height: 'auto', borderRadius: '50%' }} 
                                        src={comentario.usuario.imagen} 
                                        alt="" 
                                    />
                                    <div style={{ marginLeft: '10px', display: 'inline-block' }} >
                                        <p style={{ fontWeight: 'bold', marginBottom: '0px' }}>{comentario.usuario.nombre}</p>
                                        <p>{comentario.texto}</p>
                                    </div>
                                    <div style={{ float: 'right' }}>
                                        {(usuarioLogeado.logeado && usuarioLogeado.usuario._id === comentario.usuario._id) && (
                                            <AccionesComentarios idComentario={comentario._id} textoComentario={comentario.texto} fetchPublicacion={fetchPublicacion}/>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )
        }
    }

    const fetchCrearLike = async () => {
        await fetch (`http://localhost:3000/api/publicaciones/like/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                usuario: usuarioLogeado.usuario._id,
                publicacion: id
            })
        })
        .then((res) => {
            fetchPublicacion();
        })
        .catch((err) => console.log(err));
    }
    
    return (
        <>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>
                    {titulo}
                </h1>
                <h5 style={{ fontSize: '18px', marginBottom: '10px' }}>
                    Por {usuario.nombre}
                </h5>
                <p style={{ fontSize: '18px', marginTop: '50px', marginBottom: '30px' }}>
                    {texto}
                </p>
                {botonesAcciones()}
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p><b>{likes.length} me gusta</b></p>
                {usuarioLogeado.logeado && (
                    <div>
                        <button 
                            className="btn btn-primary"
                            onClick={fetchCrearLike}
                        >
                            Me gusta
                        </button>
                    </div>
                )}
            </div>
            <div>
                {usuarioLogeado.logeado ? (
                    <div>
                        <h1 style={{ marginTop: '20px', marginBottom: '20px', fontSize: '25px', textAlign: 'center' }}>Comentarios</h1>
                        <CrearComentario imagenUsuario={usuarioLogeado.usuario.imagen} fetchCrearComentario={fetchCrearComentario} />
                    </div>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <h1 style={{ marginTop: '20px', marginBottom: '20px', fontSize: '25px'}}>Comentarios</h1>
                        <Link to="/iniciar-sesion"> 
                            Inicia sesión o registrate para poder comentar
                        </Link>
                    </div>
                )}
                {verComentarios()}
            </div>
        </>  
    );
};

export default VerPublicacion;
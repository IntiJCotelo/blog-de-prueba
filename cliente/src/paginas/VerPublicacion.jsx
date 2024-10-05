import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CrearComentario from "../componentes/CrearComentario";

function VerPublicacion({ usuarioLogeado }) {
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');
    const [usuario, setUsuario] = useState({});	
    const [idUsuario, setIdUsuario] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        fetchPublicacion();
    }, []);
    
    const fetchPublicacion = async () => {
        const response = await fetch(`http://localhost:3000/api/publicaciones/${id}`);
        const data = await response.json();
        
        setTitulo(data.publicacion.titulo);
        setTexto(data.publicacion.texto);
        // setUsuario(data.publicacion.usuario.nombre);
        setIdUsuario(data.publicacion.usuario._id);
        
        await fetchDataUsuario(data.publicacion.usuario._id);
    };

    const fetchDataUsuario = async (idUsuario) => {
        const response = await fetch(`http://localhost:3000/api/usuarios/${idUsuario}`);
        const data = await response.json();
        console.log(data.usuario);
        setUsuario(data.usuario);
    }

    const botonesAcciones = () => {
        if (usuarioLogeado.logeado && usuarioLogeado.usuario._id === idUsuario) {
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
            <div>
                {usuarioLogeado.logeado ? (
                    <div>
                        <h1>Comentarios</h1>
                        <CrearComentario imagenUsuario={usuario.imagen} fetchCrearComentario={fetchCrearComentario} />
                    </div>
                ) : (
                    <div>
                        <h1>Comentarios</h1>
                        <Link to="/iniciar-sesion">Inicia sesión o registrate para poder comentar</Link>
                    </div>
                )}

            </div>
        </>  
    );
};

export default VerPublicacion;
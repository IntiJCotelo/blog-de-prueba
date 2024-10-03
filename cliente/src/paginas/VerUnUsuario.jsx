import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function VerUnUsuario() {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [publicaciones, setPublicaciones] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUsuario();
    }, []);

    const fetchUsuario = async () => {
        const response = await fetch(`http://localhost:3000/api/usuarios/${id}`);
        const data = await response.json();

        setNombre(data.usuario.nombre);
        setEmail(data.usuario.email);
        setPublicaciones(data.usuario.publicaciones);
    };

    const idPublicaciones = () => {
        let idPublicaciones = publicaciones.map((publicacion) => {
            return (
                <li key={publicacion._id}>
                    <Link to={`/ver-publicaciones/${publicacion._id}`}>
                        {publicacion.titulo + ' ' + `(${publicacion._id})` }
                    </Link>
                </li>
            )
        })  
        return idPublicaciones
    }    

    const eliminarUsuario = async () => {
        await fetch (`http://localhost:3000/api/usuarios/${id}`, {
            method: 'DELETE'    
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        navigate("/ver-usuarios");
    };
    
    return (
        <>
            <h1 style={{ marginTop: '20px', textAlign: 'center' }}>Ver usuario</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                <p>ID: {id}</p>
                <p>Nombre: {nombre}</p>
                <p>Email: {email}</p>
                <p>Publicaciones:</p> 
                <ul>
                    {idPublicaciones()}
                </ul>        
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Link to={`/ver-usuarios/editar/${id}`}>
                    <button
                        className='btn btn-secondary'
                        style={{ marginRight: '10px' }}
                    >
                        Editar
                    </button>
                </Link>
                {/* <BotonEditarUsuario />  */}
                <button
                    className='btn btn-danger'
                    style={{ marginLeft: '10px' }} 
                    onClick={eliminarUsuario}
                >
                    Eliminar usuario
                </button>
                {/* <BotonEliminarUsuario /> */}
            </div>
        </>
    );
};

export default VerUnUsuario;
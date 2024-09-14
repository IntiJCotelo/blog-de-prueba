import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BotonEliminarUsuario from '../componentes/BotonEliminarUsuario';
import BotonEditarUsuario from '../componentes/BotonEditarUsuario';

function VerUnUsuario() {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        document.querySelector('title').textContent = 'Ver usuario';
        fetchUsuario();
    }, []);

    const fetchUsuario = async () => {
        const response = await fetch(`http://localhost:3000/api/usuarios/${id}`);
        const data = await response.json();

        setNombre(data.usuario.nombre);
        setEmail(data.usuario.email);
        setPublicaciones(data.usuario.publicaciones);
    };

    return (
        <>
            <h1>Ver usuario</h1>
            <p>ID: {id}</p>
            <p>Nombre: {nombre}</p>
            <p>Email: {email}</p>
            <p>Publicaciones: {publicaciones.length}</p>
            <BotonEliminarUsuario />
            <BotonEditarUsuario /> 
        </>
    );
};

export default VerUnUsuario;
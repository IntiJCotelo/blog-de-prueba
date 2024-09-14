import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function VerUsuarios() {
    useEffect(() => {
        document.querySelector('title').textContent = 'Ver usuarios';
        fetchUsuarios();
    }, []); 

    const [usuarios, setUsuarios] = useState([]);

    const fetchUsuarios = async () => {
        const response = await fetch('http://localhost:3000/api/usuarios');
        const data = await response.json();

        setUsuarios(data);
    };

    const mostrarFilas = () => {
        let filas = usuarios.map((usuario) => {
            return (
                <tr key={usuario._id}>
                    <td style={{ border: '1px solid black' }}>{usuario._id}</td>
                    <td style={{ border: '1px solid black' }}>{usuario.nombre}</td>
                    <td style={{ border: '1px solid black' }}>{usuario.password}</td>
                    <td style={{ border: '1px solid black' }}>{usuario.email}</td>
                    <td style={{ border: '1px solid black' }}>
                        <Link to={`/ver-usuarios/${usuario._id}`}>Ver</Link>
                    </td>
                </tr>
            );
        });
        return filas;
    };

    return (
        <>
            <h1>Lista de usuarios</h1>
            <table style={{ border: '1px solid black' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black' }}>ID</th>
                        <th style={{ border: '1px solid black' }}>Nombre</th>
                        <th style={{ border: '1px solid black' }}>Password</th>
                        <th style={{ border: '1px solid black' }}>Email</th>
                        <th style={{ border: '1px solid black' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mostrarFilas()}
                </tbody>
            </table>
        </>
    );
};

export default VerUsuarios;
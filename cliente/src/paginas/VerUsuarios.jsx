import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function VerUsuarios() {
    useEffect(() => {
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
                    <td style={{ border: '1px solid black' }}>
                        <img src={`${usuario.imagen}`} alt="" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                    </td>
                    <td style={{ border: '1px solid black', textAlign: 'center' }}>{usuario._id}</td>
                    <td style={{ border: '1px solid black', textAlign: 'center' }}>{usuario.nombre}</td>
                    <td style={{ border: '1px solid black', textAlign: 'center' }}>{usuario.email}</td>
                    <td style={{ border: '1px solid black', textAlign: 'center' }}>
                        <Link to={`/ver-usuarios/${usuario._id}`}>Ver</Link>
                    </td>
                </tr>
            );
        });
        return filas;
    };

    return (
        <>
            <h1 style={{ marginTop: '20px', textAlign: 'center' }}> Lista de usuarios</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <table style={{ border: '1px solid black' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', textAlign: 'center' }}>Imagen</th>
                            <th style={{ border: '1px solid black', textAlign: 'center' }}>ID</th>
                            <th style={{ border: '1px solid black', textAlign: 'center' }}>Nombre</th>
                            <th style={{ border: '1px solid black', textAlign: 'center' }}>Email</th>
                            <th style={{ border: '1px solid black', textAlign: 'center' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mostrarFilas()}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default VerUsuarios;
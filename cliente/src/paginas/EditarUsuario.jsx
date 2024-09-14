import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditarUsuario() {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const manejarSubmit = async (event) => {
        event.preventDefault();

        await fetch(`http://localhost:3000/api/usuarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                email,
                password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setNombre('');
            setEmail('');
            setPassword('');
        })
        .catch(error => {
            console.error('Error:', error);
        });

        navigate(-1);
    };

    const manejarCambio = (event) => {
        const { name, value } = event.target;
        if (name === "nombre") {
            setNombre(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    return (
        <>
            <h1>Editar usuario</h1>
            <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} >
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Nuevo nombre"
                    onChange={manejarCambio}
                    value={nombre}
                    style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px"}}/>
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Nuevo email"
                    onChange={manejarCambio}
                    value={email}
                    style={{  marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px"}} />
                <input
                    type="text"
                    name="password"
                    id="password"
                    placeholder="Nueva password"
                    onChange={manejarCambio}
                    value={password}
                    style={{  marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px"}} />
                    <button type="submit">Editar</button>
            </form>
        </>
    );
};

export default EditarUsuario;
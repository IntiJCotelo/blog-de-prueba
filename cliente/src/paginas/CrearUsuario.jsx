import { useState, useEffect } from "react";

function CrearUsuario() {
    useEffect(() => {
        document.querySelector('title').textContent = 'Crear usuario';
    }, []);

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const manejarSubmit = (event) => {
        event.preventDefault();
        
        fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
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
    }

    const manejarCambio = (event) => {
        const { name, value } = event.target;
        if (name === "nombre") {
            setNombre(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    return (
        <>
            <h1>Crear usuario</h1>
            <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} >
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Nombre"
                    autoComplete="off"
                    onChange={manejarCambio}
                    value={nombre}
                    style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px"}}/>
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    autoComplete="off"
                    onChange={manejarCambio}
                    value={email}
                    style={{  marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px"}} />
                <input
                    type="text"
                    name="password"
                    id="password"
                    placeholder="Password"
                    autoComplete="off"
                    onChange={manejarCambio}
                    value={password}
                    style={{  marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px"}} />
                <button type="submit">Enviar</button>
            </form>
        </>
    );
};

export default CrearUsuario;
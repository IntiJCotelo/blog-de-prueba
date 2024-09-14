import { useState, useEffect } from "react";

function CrearPublicacion() {
    useEffect(() => {
        document.querySelector('title').textContent = 'Crear publicacion';
    }, []);

    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');
    
    const manejarSubmit = (event) => {
        event.preventDefault();
        
        fetch('http://localhost:3000/api/publicaciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo,
                texto
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setTitulo('');
            setTexto('');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const manejarCambio = (event) => {
        const { name, value } = event.target;
        if (name === "titulo") {
            setTitulo(value);
        } else if (name === "texto") {
            setTexto(value);
        }
    }

    return (
        <>
            <h1>Crear publicacion</h1>
            <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    name="titulo"
                    id="titulo"
                    placeholder="Título"
                    autoComplete="off"
                    onChange={manejarCambio}
                    value={titulo}
                    style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px"}} 
                    />
                <textarea
                    name="texto"
                    id="texto"
                    placeholder="Texto"
                    autoComplete="off"
                    onChange={manejarCambio}
                    value={texto}
                    style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px"}}
                    >
                </textarea>
                <button type="submit">Publicar</button>
            </form>
        </>    
    );
};

export default CrearPublicacion;

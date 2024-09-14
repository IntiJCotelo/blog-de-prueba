import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditarPublicacion() {
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');
    const navigate = useNavigate();
    
    const manejarSubmit = async (event) => {
        event.preventDefault();
        
        await fetch(`http://localhost:3000/api/publicaciones/${id}`, {
            method: 'PUT',
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

        navigate(-1);
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
            <h1>Editar publicacion</h1>
            <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    name="titulo"
                    id="titulo"
                    placeholder="Cambiar título"
                    autoComplete="off"
                    onChange={manejarCambio}
                    value={titulo}
                    style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px"}} 
                    />
                <textarea
                    name="texto"
                    id="texto"
                    placeholder="Cambiar texto"
                    autoComplete="off"
                    onChange={manejarCambio}
                    value={texto}
                    style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px"}}
                    >
                </textarea>
                <button type="submit">Editar</button>
            </form>
        </>
    );
};

export default EditarPublicacion;
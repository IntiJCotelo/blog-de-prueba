import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CrearPublicacion({ usuarioLogeado }) {
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');
    const navigate = useNavigate();
    
    const manejarSubmit = (event) => {
        if (titulo === "" || texto === "") {
            alert("Todos los campos son obligatorios");
            return;
        } else {
            event.preventDefault();
            
            fetch('http://localhost:3000/api/publicaciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titulo,
                    texto,
                    usuario: usuarioLogeado.usuario._id
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

            navigate("/");
        }
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
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>
                Crear publicación
            </h1>
            <div >
                <form onSubmit={manejarSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <input
                        type="text"
                        name="titulo"
                        id="titulo"
                        placeholder="Título de la publicación"
                        autoComplete="off"
                        onChange={manejarCambio}
                        value={titulo}
                        style={{ marginBottom: "30px", marginTop: "40px", padding: "10px", width: "60%", border: "2px solid #ccc", borderRadius: "5px", fontSize: "20px"}} 
                        />
                    <textarea
                        name="texto"
                        id="texto"
                        placeholder="Cuerpo de la publicación"
                        autoComplete="off"
                        onChange={manejarCambio}
                        value={texto}
                        style={{ marginBottom: "20px", padding: "10px", width: "60%", height: "300px", border: "2px solid #ccc", fontSize: "15px"}}
                        >
                    </textarea>
                    <button
                        type="submit"
                        className="btn btn-secondary"
                    >
                        Publicar
                    </button>
                </form>
            </div>
        </>    
    );
};

export default CrearPublicacion;

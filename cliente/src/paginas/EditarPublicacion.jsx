import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditarPublicacion() {
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        fecthPublicacionAEditar();
    }, []);

    const fecthPublicacionAEditar = async () => {
        const response = await fetch(`http://localhost:3000/api/publicaciones/${id}`);
        const data = await response.json();
        setTitulo(data.publicacion.titulo);
        setTexto(data.publicacion.texto);
    }

    const manejarSubmit = async (event) => {
        if (titulo === "" || texto === "") {
            alert("Todos los campos son obligatorios");
            return;
        } else {
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
                Editar publicación
            </h1>
            <form onSubmit={manejarSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <input
                    type="text"
                    name="titulo"
                    id="titulo"
                    placeholder="Cambiar título"
                    autoComplete="off"
                    onChange={manejarCambio}
                    value={titulo}
                    style={{ marginBottom: "30px", marginTop: "40px", padding: "10px", width: "60%", border: "2px solid #ccc", borderRadius: "5px", fontSize: "20px"}} 
                    />
                <textarea
                    name="texto"
                    id="texto"
                    placeholder="Cambiar texto"
                    autoComplete="off"
                    onChange={manejarCambio}
                    value={texto}
                    style={{ marginBottom: "20px", padding: "10px", width: "60%", height: "300px", border: "2px solid #ccc", fontSize: "15px"}}
                    >
                </textarea>
                <div>
                    <button 
                        type="submit"
                        className="btn btn-secondary"
                        style={{ marginRight: "10px" }}
                    >
                        Guardar
                    </button>
                    <button
                        className="btn btn-danger"
                        // onClick={() => navigate(-1)}
                        style={{ marginLeft: "10px" }}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </>
    );
};

export default EditarPublicacion;
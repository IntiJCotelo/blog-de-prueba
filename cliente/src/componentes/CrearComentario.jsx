import { useState } from "react";

function CrearComentario({ imagenUsuario, fetchCrearComentario }) {
    const [textoComentario, setTextoComentario] = useState("");

    const manejarChange = (e) => {
        setTextoComentario(e.target.value);
    };

    const manejarSubmit = (e) => {
        e.preventDefault();
        fetchCrearComentario(textoComentario);
        setTextoComentario("");
    };

    return (
        <>
            <div 
                className="input-group mb-3"
                style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "40px" }}
            >
                <img 
                    style={{ width: "35px", height: "35px", borderRadius: "50%", marginRight: "10px" }}
                    src={imagenUsuario} 
                    alt="" />
                <textarea 
                    style={{ border: "1px solid black", width: "35%", height: "50px", borderRadius: "10px", marginRight: "20px" }}
                    value={textoComentario}
                    name="comentario"
                    type="text"
                    placeholder="Escribe un comentario"
                    onChange={manejarChange}
                ></textarea>
                <button
                    className="btn btn-primary"
                    style={{ borderRadius: "10px" }}
                    type="submit"
                    onClick={manejarSubmit}
                >
                    Publicar
                </button>
            </div>    
        </>
    );
};

export default CrearComentario;
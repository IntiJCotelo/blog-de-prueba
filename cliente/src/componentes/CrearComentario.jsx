import { useState } from "react";

function CrearComentario({ imagenUsuario, fecthCrearComentario }) {
    const [textoComentario, setTextoComentario] = useState("");

    const manejarChange = (e) => {
        setTextoComentario(e.target.value);
    };

    const manejarSubmit = (e) => {
        e.preventDefault();
        fecthCrearComentario(textoComentario);
        setTextoComentario("");
    };

    return (
        <>
            <div>
                <img src="{imagenUsuario}" alt="" />
                <textarea 
                    name="comentario"
                    type="text"
                    placeholder="Escribe un comentario"
                    onChange={manejarChange}
                ></textarea>
                <button
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
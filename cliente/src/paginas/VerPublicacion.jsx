import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BotonEliminarPublicacion from "../componentes/BotonEliminarPublicacion";
import BotonEditarPublicacion from "../componentes/BotonEditarPublicacion";

function VerPublicacion() {
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');

    useEffect(() => {
        document.querySelector('title').textContent = 'Ver publicacion';
        fetchPublicacion();
    }, []);

    const fetchPublicacion = async () => {
        const response = await fetch(`http://localhost:3000/api/publicaciones/${id}`);
        const data = await response.json();

        setTitulo(data.publicacion.titulo);
        setTexto(data.publicacion.texto);
    };

    return (
        <>
            <h5>Publicación {id}</h5>
            <h1>{titulo}</h1>
            <p>{texto}</p>
            <BotonEliminarPublicacion />
            <BotonEditarPublicacion />
        </>  
    );
};

export default VerPublicacion;
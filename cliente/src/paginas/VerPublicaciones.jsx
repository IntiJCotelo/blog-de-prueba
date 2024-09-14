import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function VerPublicaciones() {
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        document.querySelector('title').textContent = 'Ver publicaciones';
        fetchPublicaciones();
    }, []);

    const fetchPublicaciones = async () => {
        const response = await fetch('http://localhost:3000/api/publicaciones');
        const data = await response.json();
        setPublicaciones(data);
    };

    const mostrarPublicaciones = () => {
        let tarjetas = publicaciones.map((publicacion) => {
            return (
                <div className="card" style={{ width: '18rem'}} key={publicacion._id}>
                    <img src="..." className="card-img-top" alt="Imagen de la publicación" />
                    <div className="card-body">
                        <h5 className="card-title">{publicacion.titulo}</h5>
                        <p className="card-text">Resumen de la publicación</p>
                        <Link to={`/ver-publicaciones/${publicacion._id}`} className="btn btn-primary">Leer más</Link>
                    </div>
                </div>
            );
        });
        return tarjetas;
    };

    return (
        <>
            <h1>Publicaciones</h1>
            <div
                style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                {mostrarPublicaciones()}
            </div>
        </>
    );
};

export default VerPublicaciones;


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function VerPublicaciones() {
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
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
            <span 
                className="badge text-bg-secondary"
                style={{ marginBottom: '20px', fontSize: '20px' }}
                >
                Publicaciones recientes
            </span>                   
            <div
                style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                {mostrarPublicaciones()}
            </div>
        </>
    );
};

export default VerPublicaciones;


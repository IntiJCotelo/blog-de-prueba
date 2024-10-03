import { useState, useEffect } from "react";
import { Link} from "react-router-dom";

function VerMisPublicaciones({ usuarioLogeado }) {
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        fetchPublicacionesUsuario();
    }, []);

    const fetchPublicacionesUsuario = async () => {
        const response = await fetch(`http://localhost:3000/api/usuarios/${usuarioLogeado.usuario._id}/`);
        const data = await response.json();
        setPublicaciones(data.usuario.publicaciones);
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
            <h1 style={{ textAlign: "center", marginTop: "20px", marginBottom: "40px" }}>Mis publicaciones</h1>
            <div
                style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}
            >
                {mostrarPublicaciones()}
            </div>
        </>
    );
};

export default VerMisPublicaciones;
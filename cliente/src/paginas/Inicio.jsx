import { Link } from "react-router-dom";
import { useEffect } from "react";

function Inicio({ usuarioLogeado }) {
    useEffect(() => {
        document.querySelector('title').textContent = 'Blog CFL 401';
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Inicio</h1>
            {usuarioLogeado.logeado && (
                <h5>
                    Bienvenido{" "}
                    <b>
                        {usuarioLogeado.usuario.nombre}
                    </b>
                </h5>
            )}
            {usuarioLogeado.logeado ? (
                <Link to={`/crear-publicacion`}>
                    <button className="btn btn-secondary">Crear publicación</button>
                </Link>
            ) : (
            <>
                <h3>Bienvenido al blog del CFL 401</h3>
                <h3>Inicia sesión o crea una cuenta para continuar</h3>
                <Link to="/iniciar-sesion">
                    <button className="btn btn-primary">Iniciar sesion</button>
                </Link>
            </>
            )}
        </div>
    );
}

export default Inicio;
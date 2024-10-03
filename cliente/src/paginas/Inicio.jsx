import { Link } from "react-router-dom";
import { useEffect } from "react";
import VerPublicaciones from "./VerPublicaciones";

function Inicio({ usuarioLogeado }) {
    useEffect(() => {
        document.querySelector('title').textContent = 'Blog CFL 401';
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            {usuarioLogeado.logeado ? (
                <h5 style={{ marginTop: "10px" }}>
                    Bienvenido{" "}
                    <b>
                        {usuarioLogeado.usuario.nombre}
                    </b>
                </h5>
            ) : (
            <>
                <h1 style={{ marginTop: "20px" }}>Bienvenido al blog del CFL 401</h1>
                <h5>Inicia sesión o registrate para poder publicar</h5>
            </>
            )}
            <div style={{ marginTop: "50px" }}>
                <VerPublicaciones />
            </div>
        </div>
    );
}

export default Inicio;
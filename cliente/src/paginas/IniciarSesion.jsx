import GoogleLogo from "../assets/google-logo.png";
import { useLocation } from "react-router-dom";

function IniciarSesion() {
    const { state } = useLocation();

    return (
        <>
            {state ? (
                <div className="alert alert-warning" role="alert" style={{ textAlign: "center" }}>
                    {state.alerta}
                </div>
            ) : (
                ""
            )}
            <div style={{ textAlign: "center" }}>
                <h1 style={{ marginBottom: "20px", marginTop: "20px" }}>Iniciar sesión con Google</h1>
                <div className="row justify-content-center">
                    <div className="col-md-3">
                        <a
                            className="btn btn-outline-dark"
                            href={`http://localhost:3000/api/usuarios/google`}
                            role="button"
                            style={{ textTransform: "none" }}
                        > 
                            <img
                                style={{ marginBottom: "3px", marginRight: "5px", width: "20px" }}
                                alt="Iniciar Sesion con Google"
                                src={GoogleLogo}
                            />
                            Iniciar sesión con Google 
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IniciarSesion;
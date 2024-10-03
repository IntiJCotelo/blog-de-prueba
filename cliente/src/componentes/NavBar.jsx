import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NavBar({ usuariologeado, setUsuarioLogeado }) {
    const navigate = useNavigate();

    const linksConectadoIzquierda = () => {
        if (usuariologeado.logeado) {
            return (
                <>
                    <ul>
                        <li className="nav-item" style={{ display: "inline-block" }}>
                            <NavLink
                                className="nav-link"
                                style={{ color: "#ccc", fontWeight: "bold", fontSize: "20px", marginRight: "25px" }}
                                onMouseOver={(e) => e.target.style.color = "#fff"}
                                onMouseOut={(e) => e.target.style.color = "#ccc"}
                                to="/mis-publicaciones"
                                >
                                Mis publicaciones
                            </NavLink>
                        </li>
                        <li className="nav-item" style={{ display: "inline-block" }}>
                            <NavLink
                                className="nav-link"
                                style={{ color: "#ccc", fontWeight: "bold", fontSize: "20px", marginRight: "25px" }}
                                onMouseOver={(e) => e.target.style.color = "#fff"}
                                onMouseOut={(e) => e.target.style.color = "#ccc"}
                                to="/crear-publicacion"
                                >
                                Crear publicación
                            </NavLink>
                        </li>
                    </ul>
                </>
            );
        }
    };
     
    const linksConectadoDerecha = () => {
        if (usuariologeado.logeado) {
            return (
                <>
                    <ul style={{ display: "flex", justifyContent: "space-between" }}>
                        <li className="nav-item" style={{ display: "inline-block" }}>
                            <NavLink
                                className="nav-link"
                                style={{ color: "#ccc", fontWeight: "bold", fontSize: "20px", marginRight: "25px" }}
                                onMouseOver={(e) => e.target.style.color = "#fff"}
                                onMouseOut={(e) => e.target.style.color = "#ccc"}
                                to="/mi-usuario"
                            >
                                Mi usuario
                            </NavLink>
                        </li>
                        <li className="nav-item" style={{ display: "inline-block" }}>
                            <NavLink
                                className="nav-link"
                                style={{ color: "#ccc", fontWeight: "bold", fontSize: "20px"}}
                                onMouseOver={(e) => e.target.style.color = "#fff"}
                                onMouseOut={(e) => e.target.style.color = "#ccc"}
                                onClick={cerrarSesion}
                            >
                                Cerrar sesión
                            </NavLink>
                        </li>
                    </ul>
                </>
            );
        }
    };    


    const linksDesconectado = () => {
        if (!usuariologeado.logeado) {
            return (
                <>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            style={{ color: "#ccc", fontWeight: "bold", fontSize: "20px" }}
                            onMouseOver={(e) => e.target.style.color = "#fff"}
                            onMouseOut={(e) => e.target.style.color = "#ccc"}
                            to="/iniciar-sesion"
                        >
                            Registrarse o iniciar sesión
                        </NavLink>
                    </li>
                </>
            );
        }
    };

    const cerrarSesion = () => {
        fetch('http://localhost:3000/api/usuarios/desconectarse', {
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            setUsuarioLogeado(data);
            navigate("/");
        })    
        .catch((err) => console.log(err));

    };

    return (
        <>
           <nav className="navbar" style={{ backgroundColor: "darkblue" }} >
                <div className="container-fluid" style={{ width: "13%"}}>
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                        <h1 className="navbar-brand" style={{ color: "white", fontWeight: "bold", fontSize: "30px", marginLeft: "10px", display: "block", padding: "10px" }}>
                            Blog CFL 401
                        </h1>
                    </NavLink>
                </div>
                <div className="container-fluid" style={{ width: "37%" }}>
                    <ul className="navbar-nav">
                        {linksConectadoIzquierda()}
                    </ul>
                </div>
                <div className="container-fluid" style={{ width: "50%" }}> 
                    <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
                        {linksConectadoDerecha()}
                        {linksDesconectado()}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
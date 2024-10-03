import { useNavigate, Link } from "react-router-dom";

function VerMiUsuario({ usuarioLogeado, setUsuarioLogeado }) {
    const navigate = useNavigate();
     
    const eliminarUsuario = async () => {
        const response = await fetch (`http://localhost:3000/api/usuarios/${usuarioLogeado.usuario._id}`, {
            method: 'DELETE',
            credentials: 'include'           
        })
        const data = response.json();
        setUsuarioLogeado(data);
        
        navigate("/");
    }

    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>Mi usuario</h1>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h5 style={{ marginBottom: "30px" }}>
                    Imagen de perfil: {""}
                    <img
                        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                        src={usuarioLogeado.usuario.imagen}
                        alt=""
                    />
                </h5>
                <h5 style={{ marginBottom: "30px" }}>Nombre: {usuarioLogeado.usuario.nombre}</h5>
                <h5 style={{ marginBottom: "30px" }}>Email: {usuarioLogeado.usuario.email}</h5>
                <Link to={`/ver-usuarios/editar/${usuarioLogeado.usuario._id}`}>
                    <button
                        className="btn btn-secondary"
                    >
                        Editar
                    </button>
                </Link>
                <button
                    className="btn btn-danger"
                    style={{ marginLeft: "10px" }}
                    onClick={eliminarUsuario}
                >
                    Eliminar cuenta
                </button>
            </div>
        </>
    );
};

export default VerMiUsuario;

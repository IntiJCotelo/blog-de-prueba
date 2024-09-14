//Este botón solo redirige a la página donde está el formulario para editar el usuario

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function BotonEditarUsuario() {
    const { id } = useParams();

    return (
        <Link to={`/ver-usuarios/editar/${id}`}>
            <button>Editar</button>
        </Link>
    );
};

export default BotonEditarUsuario;
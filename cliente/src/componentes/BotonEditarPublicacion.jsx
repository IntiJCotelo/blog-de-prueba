//Este botón solo redirige a la página donde está el formulario para editar la publicación

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function BotonEditarPublicacion() {
    const { id } = useParams();

    return (
        <Link to={`/ver-publicaciones/editar/${id}`}>
            <button>Editar</button>
        </Link>
    );
};

export default BotonEditarPublicacion;
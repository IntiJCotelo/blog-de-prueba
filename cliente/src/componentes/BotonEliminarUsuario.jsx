import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function BotonEliminarUsuario() {
    const { id } = useParams();

    const eliminarUsuario = async () => {
        await fetch (`http://localhost:3000/api/usuarios/${id}`, {
            method: 'DELETE'    
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <Link to={`/ver-usuarios/`}>
            <button onClick={eliminarUsuario}>Eliminar</button>
        </Link>
    );
};

export default BotonEliminarUsuario;
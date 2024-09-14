import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function BotonEliminarPublicacion() {
    const { id } = useParams();

    const eliminarPublicacion = async () => {
        await fetch (`http://localhost:3000/api/publicaciones/${id}`, {
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
        <Link to={`/ver-publicaciones/`}>
            <button onClick={eliminarPublicacion}>Eliminar</button>
        </Link>    
    );
};

export default BotonEliminarPublicacion;
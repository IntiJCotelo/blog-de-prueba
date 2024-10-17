import Puntitos from '../assets/puntitos.png'
import { useState } from "react";

function AccionesComentarios({ idComentario, fetchPublicacion }) {
    const [mostrarModal, setMostrarModal] = useState(false);
    
    const abrirModalEditar = () => {

        return (
            <div 
                class="modal"
                style={{ display: mostrarModal ? 'block' : 'none' }}
            >
            </div>
        )
    }    

    const eliminarComentario = () => {
        const confirmEliminar = confirm("¿Desea eliminar este comentario?");
        if (confirmEliminar) {
            fetch(`http://localhost:3000/api/comentarios/${idComentario}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                fetchPublicacion();
            })
            .catch((err) => console.log(err));
        } else {
            return
        }
    }

    return (
        <>
            <div 
                className="modal"
                style={{ display: mostrarModal ? 'block' : 'none' }}
            >
            
                <button onClick={() => setMostrarModal(false)}>Cerrar</button>
            </div>
            <div className="dropdown">
                <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img 
                        src={Puntitos} 
                        alt=""
                        style={{ width: '20px', height: '20px', marginRight: '5px' }} 
                    />
                </a>
                <ul className="dropdown-menu">
                    <li>
                        <button className="dropdown-item" href="#" onClick={() => setMostrarModal(true)}>Editar</button>
                    </li>
                    <li>
                        <button className="dropdown-item" href="#" onClick={eliminarComentario}>Eliminar</button>
                    </li>
                </ul>
            </div>
        </>
    )
}       

export default AccionesComentarios
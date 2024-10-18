import Puntitos from '../assets/puntitos.png'
import { useState } from "react";

function AccionesComentarios({ idComentario, textoComentario, fetchPublicacion }) {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [textoComentarioAEditar, setTextoComentarioAEditar] = useState(textoComentario);

    const manejarCambioEditar = (e) => {
        setTextoComentarioAEditar(e.target.value);
    }

    const manejarSubmitEditar = async (e) => {
        if (textoComentarioAEditar === "") {
            alert("El comentario no puede estar vacío");
            return;
        } else {
            e.preventDefault();

            await fetch(`http://localhost:3000/api/comentarios/${idComentario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ texto: textoComentarioAEditar })
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setMostrarModal(false);
                fetchPublicacion();
            })
            .catch((err) => console.log(err));
        }
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
            {/* MODAL EDITAR */}
            <div 
                className="modal"
                style={{ display: mostrarModal ? 'block' : 'none' }}
                >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className='modal-title'>Editar comentario</h5>
                        </div>
                        <div className="modal-body">
                            <textarea 
                                name="editar-comentario"
                                value={textoComentarioAEditar}
                                onChange={manejarCambioEditar}
                                style={{ width: '100%', height: '100px', borderRadius: '10px' }}
                                ></textarea>
                        </div>
                        <div className="modal-footer">
                            <button className='btn btn-secondary' onClick={() => setMostrarModal(false)}>Cerrar</button>
                            <button className='btn btn-primary' onClick={manejarSubmitEditar}>Guardar cambios</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* MODAL EDITAR */}

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
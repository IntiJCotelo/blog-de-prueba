import './App.css'
import { Routes, Route, useParams } from 'react-router-dom'
//USUARIOS
import CrearUsuario from './paginas/CrearUsuario.jsx'
import VerUsuarios from './paginas/VerUsuarios.jsx'
import VerUnUsuario from './paginas/VerUnUsuario.jsx'
import EditarUsuario from './paginas/EditarUsuario.jsx'
//USUARIOS

//PUBLICACIONES
import CrearPublicacion from './paginas/CrearPublicacion.jsx'
import VerPublicaciones from './paginas/VerPublicaciones.jsx'
import VerPublicacion from './paginas/VerPublicacion.jsx'
import EditarPublicacion from './paginas/EditarPublicacion.jsx'
//PUBLICACIONES

function App() {
  return (
    <>
      <Routes>
        {/* USUARIOS */}
        <Route path='/crear-usuario' element={<CrearUsuario />} />
        <Route path='/ver-usuarios' element={<VerUsuarios />} />
        <Route path='/ver-usuarios/:id' element={<VerUnUsuario />} />
        <Route path='/ver-usuarios/editar/:id' element={<EditarUsuario />} />  
        {/* USUARIOS */}
        {/* PUBLICACIONES */}
        <Route path='/crear-publicacion' element={<CrearPublicacion />} />
        <Route path='/ver-publicaciones' element={<VerPublicaciones />} />
        <Route path='/ver-publicaciones/:id' element={<VerPublicacion />} />
        <Route path='/ver-publicaciones/editar/:id' element={<EditarPublicacion />} />
        {/* PUBLICACIONES */}  
      </Routes>
    </>
  );
}

export default App

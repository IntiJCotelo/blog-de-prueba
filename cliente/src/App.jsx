// import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './UseAuth';

// COMPONENTES
import NavBar from './componentes/NavBar.jsx'
// COMPONENTES

// PÁGINAS
import Inicio from './paginas/Inicio.jsx'
// PÁGINAS

//USUARIOS
import IniciarSesion from './paginas/IniciarSesion.jsx'
import VerUsuarios from './paginas/VerUsuarios.jsx'
import VerUnUsuario from './paginas/VerUnUsuario.jsx'
import EditarUsuario from './paginas/EditarUsuario.jsx'
import VerMiUsuario from './paginas/VerMiUsuario.jsx';
//USUARIOS

//PUBLICACIONES
import CrearPublicacion from './paginas/CrearPublicacion.jsx'
import VerPublicaciones from './paginas/VerPublicaciones.jsx'
import VerPublicacion from './paginas/VerPublicacion.jsx'
import VerMisPublicaciones from './paginas/VerMisPublicaciones.jsx';
import EditarPublicacion from './paginas/EditarPublicacion.jsx'
//PUBLICACIONES

const RutaProtegidaLogeado = ({ children }) => {
  const { usuarioLogeado, cargando } = useAuth();
  if (cargando) {
    return <h1>Cargando...</h1>;
  }
  return usuarioLogeado.logeado ? (
    children
  ) : (
    <Navigate to='/iniciar-sesion' state={{ alerta: "Debes iniciar sesión o registrarte"}}/>
  )
}

const RutaProtegidaAdmin = ({ children }) => {
  const { usuarioLogeado, cargando } = useAuth();
  if (cargando) {
    return <h1>Cargando...</h1>;
  }
  return usuarioLogeado.logeado && usuarioLogeado.esAdmin ? (
    children
  ) : (
    <Navigate to='/iniciar-sesion' state={{ alerta: "No tienes los permisos necesarios"}}/>
  )
}

function App() {
  const { usuarioLogeado, setUsuarioLogeado } = useAuth();

  return (
    <>
      <NavBar
        usuariologeado={usuarioLogeado}
        setUsuarioLogeado={setUsuarioLogeado}
      />
      <Routes>
        <Route path='/' element={<Inicio usuarioLogeado={usuarioLogeado} />} />
        {/* USUARIOS */}
        <Route path='/iniciar-sesion' element={<IniciarSesion />} />
        <Route 
          path='/ver-usuarios' 
          element={
            <RutaProtegidaAdmin>
              <VerUsuarios />
            </RutaProtegidaAdmin>
          } 
        />
        <Route path='/ver-usuarios/:id' element={<VerUnUsuario />} />
        <Route 
          path='/ver-usuarios/editar/:id' 
          element={
            <RutaProtegidaLogeado>
              <EditarUsuario />
            </RutaProtegidaLogeado>
          } 
        />  
        <Route path='/mi-usuario' element={<VerMiUsuario usuarioLogeado={usuarioLogeado} setUsuarioLogeado={setUsuarioLogeado} />} />
        {/* USUARIOS */}
        {/* PUBLICACIONES */}
        <Route 
          path='/crear-publicacion' 
          element={
            <RutaProtegidaLogeado>
              <CrearPublicacion usuarioLogeado={usuarioLogeado}/>
            </RutaProtegidaLogeado>
          } 
        />
        <Route path='/ver-publicaciones' element={<VerPublicaciones />} />
        <Route path='/ver-publicaciones/:id' element={<VerPublicacion usuarioLogeado={usuarioLogeado} />} />
        <Route path='/mis-publicaciones' element={<VerMisPublicaciones usuarioLogeado={usuarioLogeado} />} />
        <Route 
          path='/ver-publicaciones/editar/:id' 
          element={
            <RutaProtegidaLogeado>
              <EditarPublicacion />
            </RutaProtegidaLogeado>
          } 
        />
        {/* PUBLICACIONES */}  
      </Routes>
    </>
  );
}

export default App

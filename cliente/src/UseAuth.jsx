import { useState, useEffect } from "react";

const useAuth = () => {
  const [usuarioLogeado, setUsuarioLogeado] = useState({
    usuario: { id: "", nombre: "", esAdmin: false },
    logeado: false,
  });
  const [cargando, setCargando] = useState(true);

  async function fetchUsuarioLogeado() {
    const respuesta = await fetch(
      `http://localhost:3000/api/usuarios/usuario-logeado`,
      {
        credentials: "include", //No olvidarse de esto
      }
    );
    const usuario = await respuesta.json();
    setUsuarioLogeado(usuario);
    setCargando(false);
  }

  useEffect(() => {
    fetchUsuarioLogeado();
  }, []);

  return {
    usuarioLogeado,
    setUsuarioLogeado,
    cargando,
  };
};

export { useAuth };
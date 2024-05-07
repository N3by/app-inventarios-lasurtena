import { Routes, Route, Navigate } from "react-router-dom";
import {
  Configuracion,
  ErrorMolecula,
  Home,
  Login,
  ProtectedRoute,
  SpinnerLoader,
  UserAuth,
  useEmpresaStore,
  useUsuariosStore,
  Marca,
  Categorias,
  Productos,
  Usuarios,
  Kardex,
  Perfil,
} from "../index";
import { useQuery } from "@tanstack/react-query";
import { Reportes } from "../pages/Reportes";

export function MyRoutes() {
  const { user } = UserAuth();
  const { mostrarUsuarios, idusuario, mostrarpermisos } = useUsuariosStore();
  const { mostrarEmpresa } = useEmpresaStore();
  const {
    data: datausuarios,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mostrar usuarios"],
    queryFn: mostrarUsuarios,
  });

  const { data: dataempresa } = useQuery({
    queryKey: ["Mostrar empresa"],
    queryFn: () => mostrarEmpresa({ idusuario: idusuario }),
    enabled: !!datausuarios,
  });

  const { data: datapermisos } = useQuery({
    queryKey: ["Mostrar permisos", { id_usuario: idusuario }],
    queryFn: () => mostrarpermisos({ id_usuario: idusuario }),
    enabled: !!datausuarios,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }
  const isAuthenticated = !!user;

  // Redirigir a login si el usuario no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (error) {
    <ErrorMolecula mensaje={error.message} />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/configurar" element={<Configuracion />} />
        <Route path="/configurar/marca" element={<Marca />} />
        <Route path="/configurar/categorias" element={<Categorias />} />
        <Route path="/configurar/productos" element={<Productos />} />
        <Route path="/configurar/usuarios" element={<Usuarios />} />
        <Route path="/kardex" element={<Kardex />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/configurar/perfil" element={<Perfil />} />
      </Route>
    </Routes>
  );
}

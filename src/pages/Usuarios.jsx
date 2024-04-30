import {
  BloqueoPagina,
  SpinnerLoader,
  UsuariosTemplate,
  useEmpresaStore,
  useMarcaStore,
  useUsuariosStore,
} from "../index";
import { useQuery } from "@tanstack/react-query";

export function Usuarios() {
  const {
    mostrarModulos,
    mostrarusuariosTodos,
    datausuarios,
    buscarusuarios,
    buscador,
    datapermisos,
  } = useUsuariosStore();

  const statePermiso = datapermisos.some((objeto) =>
    objeto.modulos.nombre.includes("Personal")
  );

  const { dataempresa } = useEmpresaStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Usuarios", { _id_empresa: dataempresa?.id }],
    queryFn: () => mostrarusuariosTodos({ _id_empresa: dataempresa?.id }),
    enabled: dataempresa?.id != null,
  });

  const { data: datamodulos } = useQuery({
    queryKey: ["mostrar modulos"],
    queryFn: mostrarModulos,
  });
  const { data: buscardata } = useQuery({
    queryKey: [
      "buscar usuarios",
      { _id_empresa: dataempresa.id, buscador: buscador },
    ],
    queryFn: () =>
      buscarusuarios({ _id_empresa: dataempresa.id, buscador: buscador }),
    enabled: dataempresa.id != null,
  });

  if (statePermiso == false) {
    return <BloqueoPagina />;
  }

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    alert("Error al traer data", error.message);
    b;
    return <span>Error...</span>;
  }

  return <UsuariosTemplate data={datausuarios} />;
}

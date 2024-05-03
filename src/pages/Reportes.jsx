import {
  BloqueoPagina,
  MarcaTemplate,
  ReportesTemplate,
  SpinnerLoader,
  useEmpresaStore,
  useKardexStore,
  useMarcaStore,
  useUsuariosStore,
} from "../index";
import { useQuery } from "@tanstack/react-query";

export function Reportes() {
  const { datapermisos } = useUsuariosStore();
  const statePermiso = datapermisos.some((objeto) =>
    objeto.modulos.nombre.includes("Reportes")
  );

  const { mostrarkardex } = useKardexStore();
  const { dataempresa } = useEmpresaStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar kardex", { _id_empresa: dataempresa?.id }],
    queryFn: () => mostrarkardex({ _id_empresa: dataempresa?.id }),
    enabled: dataempresa?.id != null,
  });

  if (statePermiso == false) {
    return <BloqueoPagina />;
  }

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    alert("Error al traer data", error.message);
    return <span>Error...</span>;
  }

  return <ReportesTemplate />;
}

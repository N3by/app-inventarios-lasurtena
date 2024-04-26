import {CategoriasTemplate, SpinnerLoader, useCategoriasStore, useEmpresaStore } from "../index";
import { useQuery } from "@tanstack/react-query";

export function Categorias() {
  const { mostrarcategorias, datacategorias, buscarcategorias, buscador } = useCategoriasStore();
  const { dataempresa } = useEmpresaStore();
  const {isLoading, error} = useQuery({
    queryKey: ["mostrar categorias", { id_empresa: dataempresa?.id}],
    queryFn: () => mostrarcategorias({ id_empresa: dataempresa?.id}), enabled:dataempresa?.id!=null,
  });
  const {data:buscardata} = useQuery({
    queryKey: ["buscar categorias", {id_empresa:dataempresa.id, descripcion:buscador},
  ],
    queryFn: () => buscarcategorias({ id_empresa: dataempresa.id, descripcion:buscador }), enabled:dataempresa.id !=null,
  });

  if (isLoading){
    return <SpinnerLoader/>
  }
  if(error){
    alert("Error al traer data", error.message);
    return <span>Error...</span>;
  }


  return <CategoriasTemplate data={datacategorias}/>;
}

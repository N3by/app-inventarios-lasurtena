import {useQuery} from "@tanstack/react-query"
import { HomeTemplate, useEmpresaStore } from "../index";
export function Home(){ 
    const {contarUsuariosXempresa, dataempresa} = useEmpresaStore();

    const {data} = useQuery({queryKey:["contar usuarios por empresa", {idempresa:dataempresa?.id}], queryFn:()=> contarUsuariosXempresa({id_empresa:dataempresa?.id}), enabled:!!dataempresa})
    return(<HomeTemplate/>);
}
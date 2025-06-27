import { MetaInserirDTO } from "@/application/dtos/comercial/MetaInserirDTO";
import { MetaAtualizarDTO } from "@/application/dtos/comercial/MetaAtualizarDTO";
import { MetaBuscarTodosDTO } from "@/application/dtos/comercial/MetaBuscarTodosDTO";
import { MetaBuscarTodosResponseDTO } from "@/application/dtos/comercial/MetaBuscarTodosResponseDTO";

export interface IMetaApiService {
  buscarTodos(dto: MetaBuscarTodosDTO): Promise<MetaBuscarTodosResponseDTO>;
  inserir(dados: MetaInserirDTO): Promise<void>;
  atualizar(dados: MetaAtualizarDTO): Promise<void>;
}

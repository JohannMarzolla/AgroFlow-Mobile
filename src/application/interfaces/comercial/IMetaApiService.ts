import { MetaInserirDTO } from "@/application/dtos/comercial/meta/MetaInserirDTO";
import { MetaAtualizarDTO } from "@/application/dtos/comercial/meta/MetaAtualizarDTO";
import { MetaBuscarTodosDTO } from "@/application/dtos/comercial/meta/MetaBuscarTodosDTO";
import { MetaBuscarTodosResponseDTO } from "@/application/dtos/comercial/meta/MetaBuscarTodosResponseDTO";

export interface IMetaApiService {
  buscarTodos(dto: MetaBuscarTodosDTO): Promise<MetaBuscarTodosResponseDTO>;
  inserir(dados: MetaInserirDTO): Promise<void>;
  atualizar(dados: MetaAtualizarDTO): Promise<void>;
}

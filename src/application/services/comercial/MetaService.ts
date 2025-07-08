import { MetaAtualizarDTO } from "@/application/dtos/comercial/meta/MetaAtualizarDTO";
import { MetaBuscarTodosDTO } from "@/application/dtos/comercial/meta/MetaBuscarTodosDTO";
import { MetaBuscarTodosResponseDTO } from "@/application/dtos/comercial/meta/MetaBuscarTodosResponseDTO";
import { MetaInserirDTO } from "@/application/dtos/comercial/meta/MetaInserirDTO";
import { IMetaApiService } from "@/application/interfaces/comercial/IMetaApiService";

export class MetaService {
  constructor(public apiService: IMetaApiService) {}

  async buscarTodos(
    dto: MetaBuscarTodosDTO
  ): Promise<MetaBuscarTodosResponseDTO> {
    return this.apiService.buscarTodos(dto);
  }

  async inserir(dados: MetaInserirDTO): Promise<void> {
    return this.apiService.inserir(dados);
  }

  async atualizar(dados: MetaAtualizarDTO): Promise<void> {
    return this.apiService.atualizar(dados);
  }
}

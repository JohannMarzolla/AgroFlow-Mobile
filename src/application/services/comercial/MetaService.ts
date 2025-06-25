import { MetaAtualizarDTO } from "@/application/dtos/comercial/MetaAtualizarDTO";
import { MetaInserirDTO } from "@/application/dtos/comercial/MetaInserirDTO";
import { IMetaApiService } from "@/application/interfaces/comercial/IMetaApiService";
import { Meta } from "@/domain/models/comercial/Meta";

export class MetaService {
  constructor(public apiService: IMetaApiService) {}

  async buscarTodos(): Promise<Meta[]> {
    return this.apiService.buscarTodos();
  }

  async inserir(dados: MetaInserirDTO): Promise<void> {
    return this.apiService.inserir(dados);
  }

  async atualizar(dados: MetaAtualizarDTO): Promise<void> {
    return this.apiService.atualizar(dados);
  }
}

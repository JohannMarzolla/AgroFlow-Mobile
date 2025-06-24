import { MetaAtualizarDTO } from "@/application/dtos/comercial/MetaAtualizarDTO";
import { MetaInserirDTO } from "@/application/dtos/comercial/MetaInserirDTO";
import { IMetaApiService } from "@/application/interfaces/comercial/IMetaApiService";

export class MetaService {
  constructor(public apiService: IMetaApiService) {}

  async inserir(dados: MetaInserirDTO): Promise<void> {
    return this.apiService.inserir(dados);
  }

  async atualizar(dados: MetaAtualizarDTO): Promise<void> {
    return this.apiService.atualizar(dados);
  }
}

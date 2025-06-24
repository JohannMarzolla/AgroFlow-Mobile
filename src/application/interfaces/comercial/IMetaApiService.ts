import { MetaInserirDTO } from "@/application/dtos/comercial/MetaInserirDTO";
import { MetaAtualizarDTO } from "@/application/dtos/comercial/MetaAtualizarDTO";

export interface IMetaApiService {
  inserir(dados: MetaInserirDTO): Promise<void>;
  atualizar(dados: MetaAtualizarDTO): Promise<void>;
}

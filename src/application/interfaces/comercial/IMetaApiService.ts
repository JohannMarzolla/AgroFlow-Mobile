import { MetaInserirDTO } from "@/application/dtos/comercial/MetaInserirDTO";
import { MetaAtualizarDTO } from "@/application/dtos/comercial/MetaAtualizarDTO";
import { Meta } from "@/domain/models/comercial/Meta";

export interface IMetaApiService {
  buscarTodos(): Promise<Meta[]>;
  inserir(dados: MetaInserirDTO): Promise<void>;
  atualizar(dados: MetaAtualizarDTO): Promise<void>;
}

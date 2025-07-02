import { FazendaBuscarTodosDTO } from "@/application/dtos/producao/fazenda/FazendaBuscarTodosDTO";
import { FazendaBuscarTodosResponseDTO } from "@/application/dtos/producao/fazenda/FazendaBuscarTodosResponseDTO";
import { FazendaInserirDTO } from "@/application/dtos/producao/fazenda/FazendaInserirDTO";
import { Fazenda } from "@/domain/models/Fazenda";

export interface IFazendaApiService {
    buscarTodos(dto:FazendaBuscarTodosDTO): Promise<FazendaBuscarTodosResponseDTO>;
    inserir(dados: FazendaInserirDTO): Promise<void>;
    // atualizar(dados: FazendaAtualizarDTO): Promise<void>;
  }
  
import { ProducaoBuscarTodosDTO } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosDTO";
import { ProducaoBuscarTodosResponseDTO } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosResponseDTO";
import { ProducaoInserirDTO } from "@/application/dtos/producao/Producao/ProducaoInserirDTO";

export interface IProducaoApiService {
    buscarTodos(dto: ProducaoBuscarTodosDTO): Promise<  ProducaoBuscarTodosResponseDTO>;
    inserir(dados:  ProducaoInserirDTO): Promise<void>;
    // atualizar(dados: FazendaAtualizarDTO): Promise<void>;
  }

 
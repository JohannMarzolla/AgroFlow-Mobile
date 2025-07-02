import { IFazendaApiService } from "../interfaces/producao/IFazendaApiService";
import { FazendaInserirDTO } from "../dtos/producao/fazenda/FazendaInserirDTO";
import { FazendaBuscarTodosDTO } from "../dtos/producao/fazenda/FazendaBuscarTodosDTO";
import { FazendaBuscarTodosResponseDTO } from "../dtos/producao/fazenda/FazendaBuscarTodosResponseDTO";

export class FazendaService {
     constructor(
        private apiService: IFazendaApiService,
      ) {}
    async buscarTodos(dto:FazendaBuscarTodosDTO): Promise<FazendaBuscarTodosResponseDTO>{
        return await this.apiService.buscarTodos(dto)

    }
    async inserir(dados:FazendaInserirDTO): Promise<void>{
        return await this.apiService.inserir(dados)

    }
  }
  
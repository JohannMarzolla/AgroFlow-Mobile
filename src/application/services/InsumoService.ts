import { IINsumoRepository } from "@/domain/repositories/IInsumoRepository";
import { InsumoAdicionarForm } from "@/domain/models/InsumoAdicionarForm";
import { Insumo } from "@/domain/models/Insumo";
import { IInsumoApiService } from "../interfaces/producao/IInsumoApiService";
import { InsumoInserirDTO } from "../dtos/producao/Insumos/InsumoInserirDTO";
import { InsumoBuscarTodosResponseDTO } from "../dtos/producao/Insumos/InsumoBuscarTodosResponseDTO";
import { InsumoBuscarTodosDTO } from "../dtos/producao/Insumos/InsumoBuscarTodosDTO";

export class InsumoService {
  constructor(
    private apiService: IInsumoApiService,

  ) {}
  async buscarTodos(dto : InsumoBuscarTodosDTO): Promise<InsumoBuscarTodosResponseDTO> {
        return await this.apiService.buscarTodos(dto)
    }

  async inserir(dados : InsumoInserirDTO): Promise<void> {
    await this.apiService.inserir(dados);
  }

}

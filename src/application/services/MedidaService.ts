import { UnidadeMedidaBuscarTodosDTO } from "../dtos/producao/UnidadeMedida/UnidadeMedidaBuscarTodosDTO";
import { IUnidadeMEdidaApiService } from "../interfaces/producao/IUnidadeMedidaApiService";
import { UnidadeMedidaBuscarTodosResponseDTO } from "../dtos/producao/UnidadeMedida/UnidadeMedidaBuscarResponseDTO";
import { UnidadeMedidaInserirDTO } from "../dtos/producao/UnidadeMedida/UnidadeMedidaInserirDTO";
import { Medida } from "@/domain/models/Medida";
import { UnidadeMedidaAtualizarDTO } from "../dtos/producao/UnidadeMedida/UnidadeMedidaAtualizarDTO";


export class MedidasService{
    constructor(
        private apiService : IUnidadeMEdidaApiService
    ){}

    async buscarTodos(dto:UnidadeMedidaBuscarTodosDTO):Promise<UnidadeMedidaBuscarTodosResponseDTO>{
        return await this.apiService.buscarTodos(dto)

    }
    async inserir(dados:UnidadeMedidaInserirDTO){
        return await this.apiService.inserir(dados)

    }
    async atualizar(medida: UnidadeMedidaAtualizarDTO): Promise<void> {
        return await this.apiService.atualizar(medida);
      }
     
}
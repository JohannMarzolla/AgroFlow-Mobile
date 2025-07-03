import { MedidaAdicionarForm } from "@/domain/models/MedidaAdiconarForm";
import { IMedidaRepository } from "@/domain/repositories/IMedidaRepository";
import { UnidadeMedidaBuscarTodosDTO } from "../dtos/producao/UnidadeMedida/UnidadeMedidaBuscarTodosDTO";
import { IUnidadeMEdidaApiService } from "../interfaces/producao/IUnidadeMedidaApiService";
import { UnidadeMedidaBuscarTodosResponseDTO } from "../dtos/producao/UnidadeMedida/UnidadeMedidaBuscarResponseDTO";
import { UnidadeMedidaInserirDTO } from "../dtos/producao/UnidadeMedida/UnidadeMedidaInserirDTO";


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
     
}
import { EstoqueInsumoAdicionarForm } from "@/domain/models/EstoqueInsumoAdicionarForm";
import { IEstoqueInsumoRepository } from "@/domain/repositories/IEstoqueInsumoRepository";
import { IEstoqueInsumoApiService } from "../interfaces/producao/IEstoqueInsumoApiService";
import { EstoqueInsumoInserirDTO } from "../dtos/producao/EstoqueInsumo/EstoqueInsumoInserirDTO";
import { EstoqueInsumoBuscarTodosResponseDTO } from "../dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosResponseDTO";
import { EstoqueInsumoBuscarTodosDTO } from "../dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosDTO";
import { EstoqueInsumo } from "@/domain/models/EstoqueInsumo";
import { EstoqueInsumoAtualizarDTO } from "../dtos/producao/EstoqueInsumo/EstoqueInsumoAtualizarDTO";

export class EstoqueInsumoService{
   constructor(
    private apiService: IEstoqueInsumoApiService
) {}
  async buscarTodos(dto:EstoqueInsumoBuscarTodosDTO): Promise<EstoqueInsumoBuscarTodosResponseDTO>{
         return await this.apiService.buscarTodos(dto)
 
     }
     async inserir(dados:EstoqueInsumoInserirDTO){
         return await this.apiService.inserir(dados)
 
     }
     async atualizar(estoqueInsumo: EstoqueInsumoAtualizarDTO): Promise<void> {
        return await this.apiService.atualizar(estoqueInsumo);
      }
      escutarAlteracoes(callback: () => void): () => void {
        return this.apiService.escutarAlteracoes(callback);
      }
}
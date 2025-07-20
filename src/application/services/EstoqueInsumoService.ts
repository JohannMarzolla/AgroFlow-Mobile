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
      // async verificarDisponibilidade(dto:EstoqueInsumoBuscarTodosDTO,insumos: { insumoId: string; quantidade: number }[]): Promise<boolean> {
      //   const todos = await this.apiService.buscarTodos(dto); // ou crie um método por ID específico
      
      //   for (const insumo of insumos) {
      //     const item = todos.dados.find((e) => e.insumoId === insumo.insumoId);
      //     if (!item || item.quantidade < insumo.quantidade) {
      //       return false;
      //     }
      //   }
      
      //   return true;
      // }
}
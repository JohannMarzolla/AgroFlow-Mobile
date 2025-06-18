import { EstoqueInsumoAdicionarForm } from "@/domain/models/EstoqueInsumoAdicionarForm";
import { IEstoqueInsumoRepository } from "@/domain/repositories/IEstoqueInsumoRepository";

export class EstoqueInsumoService{
   constructor(
    private estoqueInsumoRepo: IEstoqueInsumoRepository,
) {}
  async get(userId: string){
         return await this.estoqueInsumoRepo.getAll(userId)
 
     }
     async insert(userId: string, estoqueInsumo: EstoqueInsumoAdicionarForm){
         return await this.estoqueInsumoRepo.insert(userId, estoqueInsumo)
 
     }
}
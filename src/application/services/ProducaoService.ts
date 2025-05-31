import { IProdutoRepository } from "@/domain/repositories/IProdutoRepository";
import { IProducaoRepository } from "@/domain/repositories/IProducaoRepository";
import { Producao } from "@/domain/models/Producao";
import { ProducaoAdicionarForm } from "@/domain/models/ProducaoAdicionarForm";

export class ProducaoService {
  constructor(
    private produtoRepo: IProdutoRepository,
    private producaoRepo: IProducaoRepository,
  ) {}
   async get(userId:string){
    return await this.producaoRepo.getAll(userId);
};
   async insert(userId: string , producao:ProducaoAdicionarForm){
    const produtoExistente = await this.produtoRepo.getAll(userId);
    if (produtoExistente){
        
    }
return
}
}
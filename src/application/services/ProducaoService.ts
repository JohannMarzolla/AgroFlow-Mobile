import { IProdutoRepository } from "@/domain/repositories/IProdutoRepository";
import { IProducaoRepository } from "@/domain/repositories/IProducaoRepository";
import { ProducaoAdicionarForm } from "@/domain/models/ProducaoAdicionarForm";

export class ProducaoService {
  constructor(
    private produtoRepo: IProdutoRepository,
    private producaoRepo: IProducaoRepository,
  ) {}
   async get(userId:string){
    return await this.producaoRepo.getAll(userId);
};
  async insert(userId: string, producao: ProducaoAdicionarForm) {
  const produtoExiste = await this.produtoRepo.exists(userId, producao.produto.id);
  if (!produtoExiste) {
    throw new Error("Produto não encontrado. Não é possível registrar a produção.");
  }
  return await this.producaoRepo.insert(userId, producao);
}
  }
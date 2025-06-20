import { IProdutoRepository } from "@/domain/repositories/IProdutoRepository";
import { IProducaoRepository } from "@/domain/repositories/IProducaoRepository";
import { ProducaoAdicionarForm } from "@/domain/models/ProducaoAdicionarForm";
import { IEstoqueProdutoRepository } from "@/domain/repositories/IEstoqueProdutoRepository";
import { eventBus } from "@/shared/utils/EventBus";
import { Producao } from "@/domain/models/Producao";
import { EstoqueProdutoAdicionarForm } from "@/domain/models/EstoqueProdutoAdicionarForm";

export class ProducaoService {
  constructor(
    private produtoRepo: IProdutoRepository,
    private producaoRepo: IProducaoRepository,
    private estoqueProdutoRepo: IEstoqueProdutoRepository
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
async update(userId: string, producao: Producao) {
  const produtoExiste = await this.produtoRepo.exists(userId, producao.produto.id);
  if (!produtoExiste) {
    throw new Error("Produto não encontrado.");
  }

 await this.producaoRepo.update(userId,producao);
 
  if (producao.status === "Colhido" ) {
    const itemEstoque: EstoqueProdutoAdicionarForm = {
      produto: producao.produto,
      quantidade: producao.quantidade,
      preco: 50
    };

    await this.estoqueProdutoRepo.insert(userId, itemEstoque);

    // Emitir evento
    eventBus.emit("estoqueProduto:adicionado", itemEstoque);
  }
}
  }
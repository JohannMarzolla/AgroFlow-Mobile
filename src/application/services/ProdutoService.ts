import { IProdutoRepository } from "@/domain/repositories/IProdutoRepository";
import { Produto } from "@/domain/models/Produto";
import { ProdutoAdiconarForm } from "@/domain/models/ProdutoAdicionarForm";

export class ProdutoService {
  constructor(
    private produtoRepo: IProdutoRepository,

  ) {}
  async get(userId: string): Promise<Produto[]> {
        return await this.produtoRepo.getAll(userId)
    }

  async insert(userId: string, produto: ProdutoAdiconarForm): Promise<void> {
    await this.produtoRepo.insert(userId, produto);
  }

}

import { EstoqueProdutoAdicionarForm } from "@/domain/models/EstoqueProdutoAdicionarForm";
import { IEstoqueProdutoRepository } from "@/domain/repositories/IEstoqueProdutoRepository";

export class EstoqueProdutoService {
  constructor(
    private estoqueProdutoRepo: IEstoqueProdutoRepository,
  ) {}
  
  async get(userId: string) {
    return await this.estoqueProdutoRepo.getAll(userId);
  }
  
  async insert(userId: string, estoqueProduto: EstoqueProdutoAdicionarForm) {
    return await this.estoqueProdutoRepo.insert(userId, estoqueProduto);
  }
} 
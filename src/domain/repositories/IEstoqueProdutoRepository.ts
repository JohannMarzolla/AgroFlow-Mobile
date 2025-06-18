import { EstoqueProduto } from "../models/EstoqueProduto";
import { EstoqueProdutoAdicionarForm } from "../models/EstoqueProdutoAdicionarForm";

export interface IEstoqueProdutoRepository {
    getAll(userId: string): Promise<EstoqueProduto[]>;
    insert(userId: string, estoqueProduto: EstoqueProdutoAdicionarForm): Promise<void>;
} 
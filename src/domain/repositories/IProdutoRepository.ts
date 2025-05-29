import { Produto } from "../models/Produto";
import { ProdutoAdiconarForm } from "../models/ProdutoAdicionarForm";

export interface IProdutoRepository{
    getAll(userId: string): Promise<Produto[]>;
    insert(userId: string, produto : ProdutoAdiconarForm): Promise<void>;


}
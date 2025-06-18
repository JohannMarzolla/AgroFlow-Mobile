import { Produto } from "./Produto";

export interface EstoqueProdutoAdicionarForm {
    produto: Produto;
    quantidade: number;
    preco: number;
} 
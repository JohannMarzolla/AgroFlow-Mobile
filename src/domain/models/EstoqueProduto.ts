import { Produto } from "./Produto";

export class EstoqueProduto {
    id: string;
    produto: Produto;
    quantidade: number;
    preco?: number;

    constructor(obj: EstoqueProduto) {
        this.id = obj.id;
        this.produto = obj.produto;
        this.quantidade = obj.quantidade;
        this.preco = obj.preco
    }
} 
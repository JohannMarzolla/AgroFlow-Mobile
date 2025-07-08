import { Produto } from "./Produto";

export class EstoqueProduto {
    id: string;
    produtoId: string;
    quantidade: number;
    preco?: number;
    produtoNome?: string;
    unidadeMedidaSigla?: string

    constructor(obj: EstoqueProduto) {
        this.id = obj.id;
        this.produtoId = obj.produtoId;
        this.quantidade = obj.quantidade;
        this.preco = obj.preco;
        this.produtoNome = obj.produtoNome
        this.unidadeMedidaSigla = obj.unidadeMedidaSigla
    }
} 
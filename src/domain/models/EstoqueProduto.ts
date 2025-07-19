import { Produto } from "./Produto";

export class EstoqueProduto {
    id: string;
    produtoId: string;
    fazendaId:string;
    quantidade: number;
    preco?: number;
    produtoNome?: string;
    unidadeMedidaSigla?: string;
    criadaEm: Date;
    atualizadaEm: Date;
    lote?: string;
    precoUnitario?:string

    constructor(obj: EstoqueProduto) {
        this.id = obj.id;
        this.produtoId = obj.produtoId;
        this.fazendaId = obj.fazendaId;
        this.quantidade = obj.quantidade;
        this.preco = obj.preco;
        this.produtoNome = obj.produtoNome;
        this.unidadeMedidaSigla = obj.unidadeMedidaSigla;
        this.criadaEm = obj.criadaEm;
        this.atualizadaEm = obj.atualizadaEm;
        this.lote = obj.lote;
        this.precoUnitario = obj.precoUnitario;
    }
} 
import { Medida } from "./Medida";

export class Produto {
    id:string;
    nome:string;
    unidadeMedidaId:string; 
    unidadeMedidaSigla?: string;
    insumos?:string[]
    insumosDetalhados?: { id: string; nome: string }[];

    constructor(obj:Produto){
        this.id= obj.id
        this.nome = obj.nome
        this.unidadeMedidaId = obj.unidadeMedidaId
        this.unidadeMedidaSigla = obj.unidadeMedidaSigla
        this.insumos= obj.insumos
        this.insumosDetalhados = obj.insumosDetalhados;
    }
}
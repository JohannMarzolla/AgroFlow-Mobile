import { Insumo } from "./Insumo";

export class EstoqueInsumo {
    id: string ;
    insumoId: string;
    quantidade:number;
    preco:number;
    insumoNome?: string;
    unidadeMedidaSigla?: string


    constructor(obj:EstoqueInsumo){
        this.id = obj.id,
        this.insumoId = obj.insumoId,
        this.quantidade = obj.quantidade,
        this.preco = obj.preco,
        this.insumoNome = obj.insumoNome,
        this.unidadeMedidaSigla = obj.unidadeMedidaSigla


    }
}
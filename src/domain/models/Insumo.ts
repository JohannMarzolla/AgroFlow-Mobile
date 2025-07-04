import { Medida } from "./Medida";

export class Insumo {
    id: string;
    nome: string;
    unidadeMedidaId: string;
    unidadeMedidaSigla?: string



    constructor(obj:Insumo){
        this.id = obj.id;
        this.nome = obj.nome;
        this.unidadeMedidaId = obj.unidadeMedidaId
        this.unidadeMedidaSigla = obj.unidadeMedidaSigla
    }
}
import { Medida } from "./Medida";

export class Insumo {
    id: string;
    nome: string;
    unidadeMedida: Medida;



    constructor(obj:Insumo){
        this.id = obj.id;
        this.nome = obj.nome;
        this.unidadeMedida = obj.unidadeMedida
    }
}
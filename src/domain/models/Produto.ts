import { Medida } from "./Medida";

export class Produto {
    id:string;
    nome:string;
    unidadeMedida:Medida; 

    constructor(obj:Produto){
        this.id= obj.id
        this.nome = obj.nome
        this.unidadeMedida = obj.unidadeMedida
    }
}
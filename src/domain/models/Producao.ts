import { Produto } from "./Produto";

export class Producao {
    id: string;
    quantidade: number;
    status: string;
    data : Date;
    produto: Produto;

    constructor(obj:Producao){
        this.id = obj.id;
        this.quantidade = obj.quantidade;
        this.status = obj.status;
        this.data = obj.data;
        this.produto = obj.produto

        
    }

}
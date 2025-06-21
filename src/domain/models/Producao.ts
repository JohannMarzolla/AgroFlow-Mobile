import { ProducaoStatus } from "../enum/ProducaoStatus";
import { Fazenda } from "./Fazenda";
import { Produto } from "./Produto";

export class Producao {
    id: string;
    quantidade: number;
    status: ProducaoStatus;
    data : Date;
    produto: Produto;
    fazenda: Fazenda ;

    constructor(obj:Producao){
        this.id = obj.id;
        this.quantidade = obj.quantidade;
        this.status = obj.status;
        this.data = obj.data;
        this.produto = obj.produto;
        this.fazenda= obj.fazenda

        
    }

}
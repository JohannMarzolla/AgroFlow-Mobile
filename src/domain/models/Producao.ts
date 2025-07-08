import { ProducaoStatus } from "../enum/ProducaoStatus";

export class Producao {
    id: string;
    quantidade: number;
    status: string;
    data : Date;
    produtoId: string;
    fazendaId: string ;
    produtoNome: string ;
    fazendaNome: string 

    constructor(obj:Producao){
        this.id = obj.id;
        this.quantidade = obj.quantidade;
        this.status = obj.status;
        this.data = obj.data;
        this.produtoId = obj.produtoId;
        this.fazendaId = obj.fazendaId;
        this.produtoNome = obj.produtoNome
        this.fazendaNome = obj.fazendaNome

        
    }

}
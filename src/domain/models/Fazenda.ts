export class Fazenda {
    id: string
    nome: string
      

    constructor(obj:Fazenda){
        this.id = obj.id,
        this.nome = obj.nome
    }
}
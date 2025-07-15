export class InsumoProducao {
    insumoId: string;
    quantidade: number;
  
    constructor(obj: InsumoProducao) {
      this.insumoId = obj.insumoId;
      this.quantidade = obj.quantidade;
    }
  }
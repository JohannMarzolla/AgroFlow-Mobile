import { TipoTransacao } from "@/shared/types/TipoTransacaoEnum";

export class Transacao {
  id?: string;
  userId: string;
  tipoTransacao: TipoTransacao;
  valor: number;
  date: Date;
  file?: string;
  fileName?: string;

  constructor(obj: Transacao) {
    this.id = obj.id;
    this.userId = obj.userId;
    this.tipoTransacao = obj.tipoTransacao;
    this.valor = obj.valor;
    this.date = obj.date;
    this.file = obj.file;
    this.fileName = obj.fileName;
  }
}

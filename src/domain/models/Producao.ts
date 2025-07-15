import { ProducaoStatusEnum } from "../enum/producao/producao.enum";
import { InsumoProducao } from "./InsumoProducao";

export class Producao {
  id: string;
  quantidadePlanejada: number;
  precoPlanejado: number;
  status: ProducaoStatusEnum;
  produtoId: string;
  fazendaId: string;
  lote: string;
  dataInicio: Date;
  dataFim: Date;
  colheitaId?: string;
  insumos: InsumoProducao[];
  criadaEm: Date;
  atualizadaEm: Date;
  produtoNome?: string;
  fazendaNome?: string;

  constructor(obj: Producao) {
    this.id = obj.id;
    this.quantidadePlanejada = obj.quantidadePlanejada;
    this.precoPlanejado = obj.precoPlanejado;
    this.status = obj.status;
    this.produtoId = obj.produtoId;
    this.fazendaId = obj.fazendaId;
    this.lote = obj.lote;
    this.dataInicio = new Date(obj.dataInicio);
    this.dataFim = new Date(obj.dataFim);
    this.colheitaId = obj.colheitaId;
    this.insumos = obj.insumos;
    this.criadaEm = new Date(obj.criadaEm);
    this.atualizadaEm = new Date(obj.atualizadaEm);
    this.produtoNome = obj.produtoNome;
    this.fazendaNome = obj.fazendaNome;
  }
}

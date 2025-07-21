import { ProducaoStatusEnum } from "../enum/producao/producao.enum";
import { InsumoProducao } from "./InsumoProducao";

export class Producao {
  id: string;
  quantidadePlanejada: number;
  status: ProducaoStatusEnum;
  lote: string;
  criadaEm: Date;
  atualizadaEm: Date;
  produtoId: string;
  fazendaId: string;
  insumos: InsumoProducao[];
  precoPlanejado?: number;
  dataInicio: Date;
  dataFim: Date;
  quantidadeColhida?: number;
  perdas?: number;
  custoProducao?: number;
  precoFinal?: number;
  produtoNome?: string;
  fazendaNome?: string;

  constructor(obj: Producao) {
    this.id = obj.id;
    this.quantidadePlanejada = obj.quantidadePlanejada;
    this.status = obj.status;
    this.criadaEm = obj.criadaEm;
    this.lote = obj.lote;
    this.produtoId = obj.produtoId;
    this.fazendaId = obj.fazendaId;
    this.insumos = obj.insumos || [];
    this.precoPlanejado = obj.precoPlanejado ?? 0;
    this.atualizadaEm = obj.atualizadaEm;
    this.dataInicio = obj.dataInicio;
    this.dataFim = obj.dataFim;
    this.quantidadeColhida = obj.quantidadeColhida;
    this.perdas = obj.perdas;
    this.custoProducao = obj.custoProducao;
    this.precoFinal = obj.precoFinal;
    this.produtoNome = obj.produtoNome;
    this.fazendaNome = obj.fazendaNome;
  }
}

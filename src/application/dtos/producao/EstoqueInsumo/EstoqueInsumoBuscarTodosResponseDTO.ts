import { EstoqueInsumo } from "@/domain/models/EstoqueInsumo";


export interface EstoqueInsumoBuscarTodosResponseDTO {
  dados: EstoqueInsumo[];
  ultimoId: string;
  ultimoCriadaEm: Date;
  temMais: boolean;
}

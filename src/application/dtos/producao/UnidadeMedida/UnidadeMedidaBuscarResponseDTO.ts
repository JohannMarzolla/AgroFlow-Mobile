import { Medida } from "@/domain/models/Medida";

export interface UnidadeMedidaBuscarTodosResponseDTO {
    dados: Medida[];
    ultimoId: string;
    ultimoCriadaEm: Date;
    temMais: boolean;
  }
import { Insumo } from "@/domain/models/Insumo";

export interface InsumoBuscarTodosResponseDTO {
    dados: Insumo[];
    ultimoId: string;
    ultimoCriadaEm: Date;
    temMais: boolean;
  }
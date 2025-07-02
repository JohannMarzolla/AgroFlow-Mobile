import { Fazenda } from "@/domain/models/Fazenda";

export interface FazendaBuscarTodosResponseDTO {
  dados: Fazenda[];
  ultimoId: string;
  ultimoCriadaEm: Date;
  temMais: boolean;
}

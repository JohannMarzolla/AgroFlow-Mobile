import { Producao } from "@/domain/models/Producao";

export interface ProducaoBuscarTodosResponseDTO {
    dados: Producao[];
    ultimoId: string;
    ultimoCriadaEm: Date;
    temMais: boolean;
  }
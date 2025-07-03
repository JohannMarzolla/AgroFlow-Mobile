import { Produto } from "@/domain/models/Produto";

export interface ProdutoBuscarTodosResponseDTO {
    dados: Produto[];
    ultimoId: string;
    ultimoCriadaEm: Date;
    temMais: boolean;
  }
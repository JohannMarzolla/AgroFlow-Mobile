import { EstoqueProduto } from "@/domain/models/EstoqueProduto";

export interface EstoqueProdutoBuscarTodosResponseDTO {
    dados: EstoqueProduto[];
    ultimoId: string;
    ultimoCriadaEm: Date;
    temMais: boolean;
  }
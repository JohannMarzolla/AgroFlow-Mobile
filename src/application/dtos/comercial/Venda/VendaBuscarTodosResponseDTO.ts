import { Venda } from "@/domain/models/comercial/Venda";

export interface VendaBuscarTodosResponseDTO {
  dados: Venda[];
  ultimoId: string;
  temMais: boolean;
}

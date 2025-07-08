import { Meta } from "@/domain/models/comercial/Meta";

export interface MetaBuscarTodosResponseDTO {
  dados: Meta[];
  ultimoId: string;
  temMais: boolean;
}

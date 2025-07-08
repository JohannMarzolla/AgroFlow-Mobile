import { Usuario } from "@/domain/models/outros/Usuario";

export interface UsuarioBuscarTodosResponseDTO {
  dados: Usuario[];
  ultimoId: string;
  temMais: boolean;
}

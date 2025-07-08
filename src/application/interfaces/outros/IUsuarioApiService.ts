import { UsuarioBuscarTodosDTO } from "@/application/dtos/outros/usuario/UsuarioBuscarTodosDTO";
import { UsuarioBuscarTodosResponseDTO } from "@/application/dtos/outros/usuario/UsuarioBuscarTodosResponseDTO";
import { UsuarioInserirDTO } from "@/application/dtos/outros/usuario/UsuarioInserirDTO";

export interface IUsuarioApiService {
  buscarTodos(
    dto: UsuarioBuscarTodosDTO
  ): Promise<UsuarioBuscarTodosResponseDTO>;
  inserir(dados: UsuarioInserirDTO): Promise<void>;
}

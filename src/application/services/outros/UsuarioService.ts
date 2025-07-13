import { UsuarioAtualizarDTO } from "@/application/dtos/outros/usuario/UsuarioAtualizarDTO";
import { UsuarioBuscarTodosDTO } from "@/application/dtos/outros/usuario/UsuarioBuscarTodosDTO";
import { UsuarioBuscarTodosResponseDTO } from "@/application/dtos/outros/usuario/UsuarioBuscarTodosResponseDTO";
import { UsuarioInserirDTO } from "@/application/dtos/outros/usuario/UsuarioInserirDTO";
import { IUsuarioApiService } from "@/application/interfaces/outros/IUsuarioApiService";

export class UsuarioService {
  constructor(private apiService: IUsuarioApiService) {}

  async buscarTodos(
    dto: UsuarioBuscarTodosDTO
  ): Promise<UsuarioBuscarTodosResponseDTO> {
    return this.apiService.buscarTodos(dto);
  }

  async inserir(dados: UsuarioInserirDTO): Promise<void> {
    return this.apiService.inserir(dados);
  }

  async atualizar(dados: UsuarioAtualizarDTO): Promise<void> {
    return this.apiService.atualizar(dados);
  }

  async recuperarSenha(usuarioId: string): Promise<void> {
    return this.apiService.recuperarSenha(usuarioId);
  }
}

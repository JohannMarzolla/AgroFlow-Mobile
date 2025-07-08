import { UsuarioBuscarTodosDTO } from "@/application/dtos/outros/usuario/UsuarioBuscarTodosDTO";
import { HttpClient } from "../base/HttpClient";
import { UsuarioBuscarTodosResponseDTO } from "@/application/dtos/outros/usuario/UsuarioBuscarTodosResponseDTO";
import { IUsuarioApiService } from "@/application/interfaces/outros/IUsuarioApiService";
import { UsuarioInserirDTO } from "@/application/dtos/outros/usuario/UsuarioInserirDTO";
import { UsuarioAtualizarDTO } from "@/application/dtos/outros/usuario/UsuarioAtualizarDTO";

export class UsuarioApiService implements IUsuarioApiService {
  async buscarTodos(
    dto: UsuarioBuscarTodosDTO
  ): Promise<UsuarioBuscarTodosResponseDTO> {
    try {
      return HttpClient.post<
        UsuarioBuscarTodosDTO,
        UsuarioBuscarTodosResponseDTO
      >("usuario/", dto);
    } catch (error: any) {
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao buscar todas as usuarios");
    }
  }

  async inserir(dto: UsuarioInserirDTO): Promise<void> {
    try {
      await HttpClient.post<UsuarioInserirDTO, void>("usuario/inserir", dto);
    } catch (error: any) {
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar cadastrar usuario");
    }
  }

  async atualizar(dto: UsuarioAtualizarDTO): Promise<void> {
    try {
      await HttpClient.post<UsuarioAtualizarDTO, void>(
        "usuario/atualizar",
        dto
      );
    } catch (error: any) {
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar atualizar o usuario");
    }
  }

  async recuperarSenha(usuarioId: string): Promise<void> {
    try {
      await HttpClient.post<{ usuarioId: string }, void>(
        "usuario/recuperarSenha",
        { usuarioId: usuarioId }
      );
    } catch (error: any) {
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar recuperar senha do usuario");
    }
  }
}

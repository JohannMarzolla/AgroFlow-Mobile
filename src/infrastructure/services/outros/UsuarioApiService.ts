import { UsuarioBuscarTodosDTO } from "@/application/dtos/outros/usuario/UsuarioBuscarTodosDTO";
import { HttpClient } from "../base/HttpClient";
import { UsuarioBuscarTodosResponseDTO } from "@/application/dtos/outros/usuario/UsuarioBuscarTodosResponseDTO";
import { IUsuarioApiService } from "@/application/interfaces/outros/IUsuarioApiService";
import { UsuarioInserirDTO } from "@/application/dtos/outros/usuario/UsuarioInserirDTO";

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
      console.error("Erro ao buscar todas as usuarios", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao buscar todas as usuarios");
    }
  }

  async inserir(dto: UsuarioInserirDTO): Promise<void> {
    try {
      await HttpClient.post<UsuarioInserirDTO, void>("usuario/inserir", dto);
    } catch (error: any) {
      console.error("Erro ao inserir usuario", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar cadastrar usuario");
    }
  }
}

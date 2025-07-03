import { INotificacaoApiService } from "@/application/interfaces/outros/INotificacaoApiService";
import { HttpClient } from "../base/HttpClient";
import { NotificacaoBuscarTodasDTO } from "@/application/dtos/outros/NotificacaoBuscarTodasDTO";
import { NotificacaoBuscarTodasResponseDTO } from "@/application/dtos/outros/NotificacaoBuscarTodasResponseDTO";

export class NotificacaoApiService implements INotificacaoApiService {
  async buscarTodas(
    dto: NotificacaoBuscarTodasDTO
  ): Promise<NotificacaoBuscarTodasResponseDTO> {
    try {
      return HttpClient.post<
        NotificacaoBuscarTodasDTO,
        NotificacaoBuscarTodasResponseDTO
      >("notificacao/", dto);
    } catch (error: any) {
      throw error instanceof Error
        ? error
        : new Error(
            "Erro desconhecido ao tentar marcar todas as notificações como lidas"
          );
    }
  }

  async buscarQtdNaoLidas(): Promise<number> {
    try {
      return HttpClient.get<number>("notificacao/buscarQtdNaoLidas");
    } catch (error: any) {
      throw error instanceof Error
        ? error
        : new Error(
            "Erro desconhecido ao tentar marcar todas as notificações como lidas"
          );
    }
  }

  async marcarTodasComoLidas(): Promise<void> {
    try {
      await HttpClient.post<void, void>("notificacao/marcarTodasComoLidas");
    } catch (error: any) {
      throw error instanceof Error
        ? error
        : new Error(
            "Erro desconhecido ao tentar marcar todas as notificações como lidas"
          );
    }
  }
}

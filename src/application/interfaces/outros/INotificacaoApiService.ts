import { NotificacaoBuscarTodasDTO } from "@/application/dtos/outros/notificacao/NotificacaoBuscarTodasDTO";
import { NotificacaoBuscarTodasResponseDTO } from "@/application/dtos/outros/notificacao/NotificacaoBuscarTodasResponseDTO";

export interface INotificacaoApiService {
  buscarTodas(
    dto: NotificacaoBuscarTodasDTO
  ): Promise<NotificacaoBuscarTodasResponseDTO>;
  marcarTodasComoLidas(): Promise<void>;
  buscarQtdNaoLidas(): Promise<number>;
}

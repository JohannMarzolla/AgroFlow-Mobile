import { NotificacaoBuscarTodasDTO } from "@/application/dtos/outros/NotificacaoBuscarTodasDTO";
import { NotificacaoBuscarTodasResponseDTO } from "@/application/dtos/outros/NotificacaoBuscarTodasResponseDTO";

export interface INotificacaoApiService {
  buscarTodas(
    dto: NotificacaoBuscarTodasDTO
  ): Promise<NotificacaoBuscarTodasResponseDTO>;
  marcarTodasComoLidas(): Promise<void>;
  buscarQtdNaoLidas(): Promise<number>;
}

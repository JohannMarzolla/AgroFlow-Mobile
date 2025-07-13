import { NotificacaoBuscarTodasDTO } from "@/application/dtos/outros/notificacao/NotificacaoBuscarTodasDTO";
import { NotificacaoBuscarTodasResponseDTO } from "@/application/dtos/outros/notificacao/NotificacaoBuscarTodasResponseDTO";
import { INotificacaoApiService } from "@/application/interfaces/outros/INotificacaoApiService";

export class NotificacaoService {
  constructor(private apiService: INotificacaoApiService) {}

  async buscarTodas(
    dto: NotificacaoBuscarTodasDTO
  ): Promise<NotificacaoBuscarTodasResponseDTO> {
    return this.apiService.buscarTodas(dto);
  }

  async marcarTodasComoLidas(): Promise<void> {
    return this.apiService.marcarTodasComoLidas();
  }

  async buscarQtdNaoLidas(): Promise<number> {
    return this.apiService.buscarQtdNaoLidas();
  }
}

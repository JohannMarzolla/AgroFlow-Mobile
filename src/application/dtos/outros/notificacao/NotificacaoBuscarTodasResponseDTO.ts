import { Notificacao } from "@/domain/models/outros/Notificacao";

export interface NotificacaoBuscarTodasResponseDTO {
  dados: Notificacao[];
  ultimoId: string | null;
  temMais: boolean;
}

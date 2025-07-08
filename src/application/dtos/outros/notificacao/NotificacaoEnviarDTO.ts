import { NotificacaoTipoEnum } from "@/domain/enum/outros/notificacao.enum";

export interface NotificacaoEnviarDTO {
  titulo: string;
  descricao: string;
  tipo: NotificacaoTipoEnum;
}

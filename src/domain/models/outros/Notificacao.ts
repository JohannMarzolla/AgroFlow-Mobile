import { NotificacaoTipoEnum } from "@/domain/enum/outros/notificacao.enum";

export interface Notificacao {
  id: string;
  titulo: string;
  descricao: string;
  dataEnvio: Date;
  lida: boolean;
  tipo: NotificacaoTipoEnum;
}

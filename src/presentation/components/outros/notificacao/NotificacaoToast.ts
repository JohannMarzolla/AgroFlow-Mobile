import { NotificacaoTipoEnum } from "@/domain/enum/outros/notificacao.enum";
import Toast from "react-native-toast-message";

export class NotificacaoToast {
  static Recebida(
    tipo: NotificacaoTipoEnum,
    titulo: string,
    descricao: string
  ) {
    Toast.show({
      type: "notificacao",
      text1: titulo,
      text2: descricao,
      position: "bottom",
      visibilityTime: 7000,
      props: {
        tipo,
      },
    });
  }

  static QtdNaoLida(quantity: number) {
    Toast.show({
      type: "info",
      text1: `Existem ${quantity} notificações não lidas.`,
      text1Style: { fontSize: 14 },
      position: "bottom",
      visibilityTime: 7000,
    });
  }
}

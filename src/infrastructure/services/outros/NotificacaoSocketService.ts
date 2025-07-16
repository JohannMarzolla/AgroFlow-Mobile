import { io, Socket } from "socket.io-client";
import * as Notifications from "expo-notifications";
import { NotificacaoEnviarDTO } from "@/application/dtos/outros/notificacao/NotificacaoEnviarDTO";
import { eventBus } from "@/shared/utils/EventBus";
import { NotificacaoToast } from "@/presentation/components/outros/notificacao/NotificacaoToast";

export class NotificacaoSocketService {
  private static _instance: NotificacaoSocketService;
  private socket?: Socket;

  private constructor() {}

  public static getInstance(): NotificacaoSocketService {
    if (!this._instance) {
      this._instance = new NotificacaoSocketService();
    }
    return this._instance;
  }

  connect(token: string) {
    const wsURL = process.env.EXPO_PUBLIC_NOTIF_WS_URL;
    if (wsURL) {
      this.socket = io(wsURL, {
        query: {},
        auth: { token },
        transports: ["websocket"],
      });

      this.socket.on("notification", async (data: NotificacaoEnviarDTO) => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: data.titulo,
            body: data.descricao,
          },
          trigger: null,
        });

        NotificacaoToast.Recebida(data.tipo, data.titulo, data.descricao);
        eventBus.emit("notificacao:receive", data);
      });
    }
  }

  disconnect() {
    this.socket?.disconnect();
  }
}

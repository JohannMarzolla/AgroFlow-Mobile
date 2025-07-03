import { io, Socket } from "socket.io-client";
import * as Notifications from "expo-notifications";
import { NotificacaoEnviarDTO } from "@/application/dtos/outros/NotificacaoEnviarDTO";

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

  connect(token: string, onReceive: (n: NotificacaoEnviarDTO) => void) {
    const wsURL = process.env.EXPO_PUBLIC_NOTIF_WS_URL;
    if (wsURL) {
      this.socket = io(process.env.EXPO_PUBLIC_NOTIF_WS_URL, {
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

        onReceive(data);
      });
    }
  }

  disconnect() {
    this.socket?.disconnect();
  }
}

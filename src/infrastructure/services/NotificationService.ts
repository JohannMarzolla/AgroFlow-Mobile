import { io, Socket } from "socket.io-client";
import * as Notifications from "expo-notifications";
import { UserTokenService } from "./base/UserTokenService";
import { NotificationDTO } from "../dtos/NotificationDTO";

export class NotificationService {
  private static _instance: NotificationService;
  private socket?: Socket;

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!this._instance) {
      this._instance = new NotificationService();
    }
    return this._instance;
  }

  connect(token: string, onReceive: (n: NotificationDTO) => void) {
    const wsURL = process.env.EXPO_PUBLIC_NOTIF_WS_URL;
    if (wsURL) {
      this.socket = io(process.env.EXPO_PUBLIC_NOTIF_WS_URL, {
        query: {},
        auth: { token },
        transports: ["websocket"],
      });

      this.socket.on("notification", async (data: NotificationDTO) => {
        // 1. dispara local push
        await Notifications.scheduleNotificationAsync({
          content: {
            title: data.title,
            body: data.description,
          },
          trigger: null,
        });

        // 2. envia para quem quiser tratar (ex: tela)
        onReceive(data);
      });
    }
  }

  disconnect() {
    this.socket?.disconnect();
  }
}

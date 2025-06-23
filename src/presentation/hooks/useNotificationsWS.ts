import { useEffect } from "react";
import { NotificationService } from "@/infrastructure/services/NotificationService";
import { useNotificationContext } from "@/presentation/contexts/NotificationContext";
import { useAuth } from "../contexts/AuthContext";

export function useNotificationWS() {
  const { addNotification } = useNotificationContext();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const service = NotificationService.getInstance();
    service.connect(user.token, (notification) => {
      addNotification(notification);
    });

    return () => {
      service.disconnect();
    };
  }, [user]);
}

import { useEffect } from "react";
import { NotificacaoSocketService } from "@/infrastructure/services/outros/NotificacaoSocketService";
import { useNotificacaoContext } from "@/presentation/contexts/outros/NotificacaoContext";
import { useAuth } from "../contexts/AuthContext";

export function useNotificacaoWS() {
  const { carregar } = useNotificacaoContext();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const service = NotificacaoSocketService.getInstance();
    service.connect(user.token, () => {
      carregar();
    });

    return () => {
      service.disconnect();
    };
  }, [user]);
}

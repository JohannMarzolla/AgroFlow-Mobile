import { useEffect } from "react";
import { NotificacaoSocketService } from "@/infrastructure/services/outros/NotificacaoSocketService";
import { useAuth } from "../contexts/AuthContext";
import { NotificacaoService } from "@/application/services/outros/NotificacaoService";
import { NotificacaoApiService } from "@/infrastructure/services/outros/NotificacaoApiService";
import { NotificacaoToast } from "../components/outros/notificacao/NotificacaoToast";

export function useNotificacaoWS() {
  const { user } = useAuth();
  const metaService = new NotificacaoService(new NotificacaoApiService());

  async function mostrarQtdNaoLida() {
    const qtdNaoLida = await metaService.buscarQtdNaoLidas();
    if (qtdNaoLida > 0) NotificacaoToast.QtdNaoLida(qtdNaoLida);
  }

  useEffect(() => {
    if (!user) return;

    const service = NotificacaoSocketService.getInstance();
    service.connect(user.token);

    mostrarQtdNaoLida();

    return () => {
      service.disconnect();
    };
  }, [user]);
}

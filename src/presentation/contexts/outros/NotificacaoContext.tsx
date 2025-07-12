import { NotificacaoService } from "@/application/services/outros/NotificacaoService";
import { Notificacao } from "@/domain/models/outros/Notificacao";
import { NotificacaoApiService } from "@/infrastructure/services/outros/NotificacaoApiService";
import { ShowToast } from "@/presentation/components/ui/Toast";
import { eventBus } from "@/shared/utils/EventBus";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface NotificacaoContextData {
  notificacoes: Notificacao[];
  loading: boolean;
  carregar(): Promise<void>;
}

const NotificacaoContext = createContext<NotificacaoContextData | undefined>(
  undefined
);

export const NotificacaoProvider = ({ children }: { children: ReactNode }) => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastId, setLastId] = useState<string | null>(null);
  const metaService = new NotificacaoService(new NotificacaoApiService());

  const carregar = async (reset = false) => {
    if (loading || (!reset && !hasMore)) return;

    try {
      setLoading(true);

      const result = await metaService.buscarTodas({
        limite: 5,
        ultimoId: !reset ? lastId : null,
      });
      setHasMore(result.temMais);
      setLastId(result.ultimoId);
      setNotificacoes((prev) =>
        reset ? result.dados : [...prev, ...result.dados]
      );
    } catch (error) {
      setHasMore(false);
      ShowToast("error", "Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();

    const atualizarDados = async () => {
      console.log("recebeu mensagem e vai atualizar context");
      carregar(true);
    };
    eventBus.on("notificacao:receive", atualizarDados);

    return () => {
      eventBus.off("notificacao:receive", atualizarDados);
    };
  }, []);

  return (
    <NotificacaoContext.Provider value={{ notificacoes, loading, carregar }}>
      {children}
    </NotificacaoContext.Provider>
  );
};

export const useNotificacaoContext = () => {
  const context = useContext(NotificacaoContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado. useNotificacao deve estar dentro de NotificacaoProvider."
    );
  }
  return context;
};

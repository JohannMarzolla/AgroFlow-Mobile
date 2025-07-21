import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { ShowToast } from "../components/ui/Toast";
import { EstoqueProduto } from "@/domain/models/EstoqueProduto";
import { EstoqueProdutoService } from "@/application/services/EstoqueProdutoService";
import { EstoqueProdutoInserirDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoInserirDTO";
import { EstoqueProdutoApiService } from "@/infrastructure/services/producao/EstoqueProdutoApiService";
import { EstoqueProdutoAtualizarDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueInsumoAtualizarDTO";

interface EstoqueProdutoContextData {
  estoqueProdutos: EstoqueProduto[];
  loading: boolean;
  carregar: (reset?: boolean) => Promise<void>;
  adicionar: (estoqueProduto: EstoqueProdutoInserirDTO) => Promise<boolean>;
  atualizar(estoque: EstoqueProdutoAtualizarDTO): Promise<boolean>;
}

const EstoqueProdutoContext = createContext<
  EstoqueProdutoContextData | undefined
>(undefined);

export const EstoqueProdutoProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useAuth();
  const userId = user?.userId;

  const [estoqueProdutos, setEstoqueProdutos] = useState<EstoqueProduto[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastId, setLastId] = useState<string | null>(null);

  const estoqueProdutoService = useMemo(
    () => new EstoqueProdutoService(new EstoqueProdutoApiService()),
    []
  );

  const carregar = async (reset = false) => {
    if (loading || (!reset && !hasMore)) return;
    if (!userId) return;

    try {
      setLoading(true);
      const result = await estoqueProdutoService.buscarTodos({
        limite: 10,
        ultimoId: !reset ? lastId : null,
      });
      setHasMore(result.temMais);
      setLastId(result.ultimoId);
      setEstoqueProdutos((prev) =>
        reset ? result.dados : [...prev, ...result.dados]
      );
    } catch (error) {
      setHasMore(false);
      ShowToast("error", "Erro ao carregar estoque de produtos.");
    } finally {
      setLoading(false);
    }
  };

  const adicionar = async (dados: EstoqueProdutoInserirDTO) => {
    try {
      await estoqueProdutoService.inserir(dados);
      await carregar(true); // recarrega todos
      ShowToast("success", "Estoque de produto adicionado com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao adicionar estoque de produto.");
      return false;
    }
  };
  const atualizar = async (estoque: EstoqueProdutoAtualizarDTO) => {
    try {
      await estoqueProdutoService.atualizar(estoque);
      await carregar(true);
      ShowToast("success", "Produção atualizada com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao atualizar produção.");
      return false;
    }
  };

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = estoqueProdutoService.escutarAlteracoes(() => {
      carregar(true); // recarrega sempre que houver alteração no Firestore
    });

    return unsubscribe;
  }, [userId]);

  useEffect(() => {
    if (userId) carregar(true);
  }, [userId]);

  return (
    <EstoqueProdutoContext.Provider
      value={{ estoqueProdutos, loading, carregar, adicionar, atualizar }}
    >
      {children}
    </EstoqueProdutoContext.Provider>
  );
};

export const useEstoqueProduto = () => {
  const context = useContext(EstoqueProdutoContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado. useEstoqueProduto deve estar dentro de EstoqueProdutoProvider."
    );
  }
  return context;
};

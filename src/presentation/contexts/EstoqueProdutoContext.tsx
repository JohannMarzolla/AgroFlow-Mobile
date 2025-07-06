import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { ShowToast } from "../components/ui/Toast";
import { EstoqueProduto } from "@/domain/models/EstoqueProduto";
import { EstoqueProdutoService } from "@/application/services/EstoqueProdutoService";
import { EstoqueProdutoInserirDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoInserirDTO";
import { EstoqueProdutoApiService } from "@/infrastructure/services/producao/EstoqueProdutoApiService";

interface EstoqueProdutoContextData {
  estoqueProdutos: EstoqueProduto[];
  loading: boolean;
  carregar(): Promise<void>;
  adicionar(estoqueProduto: EstoqueProdutoInserirDTO): Promise<boolean>;
}

const EstoqueProdutoContext = createContext<EstoqueProdutoContextData | undefined>(undefined);

export const EstoqueProdutoProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const userId = user?.userId  
  const [estoqueProdutos, setEstoqueProdutos] = useState<EstoqueProduto[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastId, setLastId] = useState<string | null>(null);


  const estoqueProdutoService = new EstoqueProdutoService(new EstoqueProdutoApiService());

  const carregar = async (reset = false) => {
    if (loading || (!reset && !hasMore)) return;

    try {
      setLoading(true);

      const result = await estoqueProdutoService.buscarTodos({
        limite: 5,
        ultimoId: !reset ? lastId : null,
      });
      setHasMore(result.temMais);
      setLastId(result.ultimoId);
      setEstoqueProdutos((prev) => (reset ? result.dados : [...prev, ...result.dados]));
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
      await carregar(true);
      ShowToast("success", "Estoque de produto adicionado com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao adicionar estoque de produto.");
      return false;
    }
  };

  useEffect(() => {
    carregar();
  }, [userId]);

  return (
    <EstoqueProdutoContext.Provider value={{ 
      estoqueProdutos,
      loading,
      carregar,
      adicionar, 
    }}>
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
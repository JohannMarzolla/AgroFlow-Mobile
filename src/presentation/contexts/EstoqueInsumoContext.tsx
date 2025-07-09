import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { ShowToast } from "../components/ui/Toast";
import { EstoqueInsumo } from "@/domain/models/EstoqueInsumo";
import { EstoqueInsumoService } from "@/application/services/EstoqueInsumoService";
import { EstoqueInsumoInserirDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoInserirDTO";
import { EstoqueInsumoApiService } from "@/infrastructure/services/producao/EstoqueInsumoApiService";
import { EstoqueInsumoAtualizarDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoAtualizarDTO";



interface EstoqueInsumoContextData {
  estoqueInsumos: EstoqueInsumo[];
  loading: boolean;
  carregar(): Promise<void>;
  adicionar(estoqueInsumo: EstoqueInsumoInserirDTO): Promise<boolean>;
  atualizar(estoque:EstoqueInsumoAtualizarDTO): Promise<boolean>;
}
const EstoqueInsumoContext = createContext<EstoqueInsumoContextData | undefined>(undefined);

export const EstoqueInsumoProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const userId = user?.userId  
  const [estoqueInsumos, setEstoqueInsumos] = useState<EstoqueInsumo[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastId, setLastId] = useState<string | null>(null);

  const estoqueInsumoService = new EstoqueInsumoService(new EstoqueInsumoApiService());


  const carregar = async (reset = false) => {
    if (loading || (!reset && !hasMore)) return;

    try {
      setLoading(true);

      const result = await estoqueInsumoService.buscarTodos({
        limite: 5,
        ultimoId: !reset ? lastId : null,
      });
      setHasMore(result.temMais);
      setLastId(result.ultimoId);
      setEstoqueInsumos((prev) => (reset ? result.dados : [...prev, ...result.dados]));
    } catch (error) {
      setHasMore(false);
      ShowToast("error", "Erro ao carregar estoque de insumos.");
    } finally {
      setLoading(false);
    }
  };

  const adicionar = async (dados: EstoqueInsumoInserirDTO) => {
    try {
      await estoqueInsumoService.inserir(dados);
      await carregar(true);
      ShowToast("success", "Estoque de insumo adicionado com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao adicionar estoque de insumo.");
      return false;
    }
  };
  const atualizar = async (estoque: EstoqueInsumoAtualizarDTO) => {
    try {
      await estoqueInsumoService.atualizar(estoque);
      await carregar(true);
      ShowToast("success", "Meta atualizada com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao atualizar meta.");
      return false;
    }
  };

 useEffect(() => {
     carregar();
  }, [userId]);

  return (
    <EstoqueInsumoContext.Provider value={{ estoqueInsumos,
      loading,
      carregar,
      adicionar,
      atualizar }}>
      {children}
    </EstoqueInsumoContext.Provider>
  );
}

export const useProducao = () => {
  const context = useContext(EstoqueInsumoContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado. useProdutos deve estar dentro de ProdutosProvider."
    );
  }
  return context;
};

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { ShowToast } from "../components/ui/Toast";
import { Producao } from "@/domain/models/Producao";
import { ProducaoService } from "@/application/services/ProducaoService";
import { ProducaoInserirDTO } from "@/application/dtos/producao/Producao/ProducaoInserirDTO";
import { ProducaoApiService } from "@/infrastructure/services/producao/ProducaoApiService";


interface ProducaoContextData {
  producao: Producao[];
  loading: boolean;
  carregar(): Promise<void>;
  adicionar(producao: ProducaoInserirDTO): Promise<boolean>;
  // atualizar(producao: Producao): Promise<boolean>;
}
const ProducaoContext = createContext<ProducaoContextData | undefined>(undefined);

export const ProducaoProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const userId = user?.userId  
  const [producao, setProducao] = useState<Producao[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastId, setLastId] = useState<string | null>(null);

  const producaoService = new ProducaoService(new ProducaoApiService());
  console.log("producao contexto", producao)

  const carregar = async (reset = false) => {
    if (loading || (!reset && !hasMore)) return;

    try {
      setLoading(true);

      const result = await producaoService.buscarTodos({
        limite: 5,
        ultimoId: !reset ? lastId : null,
      });
      setHasMore(result.temMais);
      setLastId(result.ultimoId);
      setProducao((prev) => (reset ? result.dados : [...prev, ...result.dados]));
    } catch (error) {
      setHasMore(false);
      ShowToast("error", "Erro ao carregar produções.");
    } finally {
      setLoading(false);
    }
  };

  const adicionar = async (dados: ProducaoInserirDTO) => {
    try {
      await producaoService.inserir(dados);
      await carregar(true);
      ShowToast("success", "Produção adicionada com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao adicionar produção.");
      return false;
    }
  };

  // const atualizar = async (producao: Producao) => {
  //   try {
  //     await producaoService.atualizar(producao);
  //     await carregar(true);
  //     ShowToast("success", "Produção atualizada com sucesso.");
  //     return true;
  //   } catch (error) {
  //     ShowToast("error", "Erro ao atualizar produção.");
  //     return false;
  //   }
  // };

  useEffect(() => {
    carregar();
  }, [userId]);

  return (
    <ProducaoContext.Provider value={{ 
      producao,
      loading,
      carregar,
      adicionar,
      // atualizar,
    }}>
      {children}
    </ProducaoContext.Provider>
  );
};

export const useProducao = () => {
  const context = useContext(ProducaoContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado. useProdutos deve estar dentro de ProdutosProvider."
    );
  }
  return context;
};

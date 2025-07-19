import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { ShowToast } from "../components/ui/Toast";
import { Insumo } from "@/domain/models/Insumo";
import { InsumoService } from "@/application/services/InsumoService";
import { InsumoInserirDTO } from "@/application/dtos/producao/Insumos/InsumoInserirDTO";
import { InsumoApiService } from "@/infrastructure/services/producao/InsumoApiService";
import { InsumoAtualizarDTO } from "@/application/dtos/producao/Insumos/InsumoAtualizarDTO";

interface InsumoContextData {
  insumos: Insumo[];
  loading: boolean;
  carregar(): Promise<void>;
  adicionar(insumo: InsumoInserirDTO): Promise<boolean>;
  atualizar(insumo: InsumoAtualizarDTO): Promise<boolean>;
}

const InsumoContext = createContext<InsumoContextData | undefined>(undefined);

export const InsumoProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const userId = user?.userId;
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastId, setLastId] = useState<string | null>(null);

  const insumoService = new InsumoService(new InsumoApiService());

  const carregar = async (reset = false) => {
    if (loading || (!reset && !hasMore)) return;

    try {
      setLoading(true);

      const result = await insumoService.buscarTodos({
        limite: 5,
        ultimoId: !reset ? lastId : null,
      });
      setHasMore(result.temMais);
      setLastId(result.ultimoId);
      setInsumos((prev) => (reset ? result.dados : [...prev, ...result.dados]));
    } catch (error) {
      setHasMore(false);
      ShowToast("error", "Erro ao carregar insumos.");
    } finally {
      setLoading(false);
    }
  };

  const adicionar = async (dados: InsumoInserirDTO) => {
    try {
      await insumoService.inserir(dados);
      await carregar(true);
      ShowToast("success", "Insumo adicionado com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao adicionar insumo.");
      return false;
    }
  };
  const atualizar = async (insumo: InsumoAtualizarDTO) => {
    try {
      await insumoService.atualizar(insumo);
      await carregar(true);
      ShowToast("success", "Produção atualizada com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao atualizar produção.");
      return false;
    }
  };

  useEffect(() => {
    carregar(true);
  }, [userId]);

  return (
    <InsumoContext.Provider
      value={{
        insumos,
        loading,
        carregar,
        adicionar,
        atualizar,
      }}
    >
      {children}
    </InsumoContext.Provider>
  );
};

export const useInsumo = () => {
  const context = useContext(InsumoContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado. useProdutos deve estar dentro de InsumosProvider."
    );
  }
  return context;
};

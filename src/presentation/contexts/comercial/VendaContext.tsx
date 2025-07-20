import { VendaAtualizarDTO } from "@/application/dtos/comercial/meta/Venda/VendaAtualizarDTO";
import { VendaInserirDTO } from "@/application/dtos/comercial/meta/Venda/VendaInserirDTO";
import { VendaService } from "@/application/services/comercial/VendaService";
import { Venda } from "@/domain/models/comercial/Venda";
import { VendaApiService } from "@/infrastructure/services/comercial/VendaApiService";
import { ShowToast } from "@/presentation/components/ui/Toast";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface VendaContextData {
  vendas: Venda[];
  loading: boolean;
  carregar(): Promise<void>;
  adicionar(venda: VendaInserirDTO): Promise<boolean>;
  atualizar(venda: VendaAtualizarDTO): Promise<boolean>;
}

const VendaContext = createContext<VendaContextData | undefined>(undefined);

export const VendaProvider = ({ children }: { children: ReactNode }) => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastId, setLastId] = useState<string | null>(null);
  const vendaService = new VendaService(new VendaApiService());

  const carregar = async (reset = false) => {
    if (loading || (!reset && !hasMore)) return;

    try {
      setLoading(true);

      const result = await vendaService.buscarTodos({
        limite: 10,
        ultimoId: !reset ? lastId : null,
      });
      setHasMore(result.temMais);
      setLastId(result.ultimoId);
      setVendas((prev) => (reset ? result.dados : [...prev, ...result.dados]));
    } catch (error) {
      setHasMore(false);
      ShowToast("error", "Erro ao carregar vendas.");
    } finally {
      setLoading(false);
    }
  };

  const adicionar = async (venda: VendaInserirDTO) => {
    try {
      await vendaService.inserir(venda);
      await carregar(true);
      ShowToast("success", "Venda adicionada com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao adicionar venda.");
      return false;
    }
  };

  const atualizar = async (venda: VendaAtualizarDTO) => {
    try {
      await vendaService.atualizar(venda);
      await carregar(true);
      ShowToast("success", "Venda atualizada com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao atualizar venda.");
      return false;
    }
  };

  useEffect(() => {
    carregar();
    console.log("vendas", vendas);
  }, []);
  return (
    <VendaContext.Provider
      value={{ vendas, loading, carregar, adicionar, atualizar }}
    >
      {children}
    </VendaContext.Provider>
  );
};

export const useVenda = () => {
  const context = useContext(VendaContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado. useVenda deve estar dentro de VendaProvider."
    );
  }
  return context;
};

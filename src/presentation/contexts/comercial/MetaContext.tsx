import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { MetaInserirDTO } from "@/application/dtos/comercial/MetaInserirDTO";
import { Meta } from "@/domain/models/comercial/Meta";
import { MetaService } from "@/application/services/comercial/MetaService";
import { MetaApiService } from "@/infrastructure/services/comercial/MetaApiService";
import { ShowToast } from "@/presentation/components/ui/Toast";
import { MetaBuscarTodosResponseDTO } from "@/application/dtos/comercial/MetaBuscarTodosResponseDTO";

interface MetaContextData {
  metas: Meta[];
  loading: boolean;
  carregar(): Promise<void>;
  adicionar(meta: MetaInserirDTO): Promise<void>;
}

const MetaContext = createContext<MetaContextData | undefined>(undefined);

export const MetaProvider = ({ children }: { children: ReactNode }) => {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastId, setLastId] = useState<string | undefined>(undefined);
  const [lastCriadaEm, setLastCriadaEm] = useState<Date | undefined>(undefined);
  const metaService = new MetaService(new MetaApiService());

  const carregar = async (reset = false) => {
    if (loading || (!reset && !hasMore)) return;

    try {
      setLoading(true);

      const result = await metaService.buscarTodos({
        limite: 5,
        ultimoCriadaEm: lastCriadaEm,
        ultimoId: lastId,
      });
      setMetas(result.dados);
      setHasMore(result.temMais);
      setLastId(result.ultimoId);
      setLastCriadaEm(result.ultimoCriadaEm);
    } catch (error) {
      ShowToast("error", "Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  const adicionar = async (meta: MetaInserirDTO) => {
    try {
      await metaService.inserir(meta);
      await carregar();
      ShowToast("success", "Produto adicionado com sucesso.");
    } catch (error) {
      ShowToast("error", "Erro ao adicionar produto.");
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <MetaContext.Provider value={{ metas, loading, carregar, adicionar }}>
      {children}
    </MetaContext.Provider>
  );
};

export const useMeta = () => {
  const context = useContext(MetaContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado. useProdutos deve estar dentro de ProdutosProvider."
    );
  }
  return context;
};

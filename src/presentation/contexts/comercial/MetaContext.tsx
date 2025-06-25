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

interface MetaContextData {
  metas: Meta[];
  adicionarMeta(meta: MetaInserirDTO): Promise<void>;
}

const MetaContext = createContext<MetaContextData | undefined>(undefined);

export const MetaProvider = ({ children }: { children: ReactNode }) => {
  const [metas, setMetas] = useState<Meta[]>([]);
  const metaService = new MetaService(new MetaApiService());

  const carregarMetas = async () => {
    try {
      const metaCarregadas = await metaService.buscarTodos();
      setMetas(metaCarregadas);
    } catch (error) {
      ShowToast("error", "Erro ao carregar produtos.");
    }
  };

  const adicionarMeta = async (meta: MetaInserirDTO) => {
    try {
      await metaService.inserir(meta);
      await carregarMetas();
      ShowToast("success", "Produto adicionado com sucesso.");
    } catch (error) {
      ShowToast("error", "Erro ao adicionar produto.");
    }
  };

  useEffect(() => {
    carregarMetas();
  }, []);

  return (
    <MetaContext.Provider value={{ metas, adicionarMeta }}>
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

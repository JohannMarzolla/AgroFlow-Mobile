import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { MetaInserirDTO } from "@/application/dtos/comercial/meta/MetaInserirDTO";
import { Meta } from "@/domain/models/comercial/Meta";
import { MetaService } from "@/application/services/comercial/MetaService";
import { MetaApiService } from "@/infrastructure/services/comercial/MetaApiService";
import { ShowToast } from "@/presentation/components/ui/Toast";
import { MetaAtualizarDTO } from "@/application/dtos/comercial/meta/MetaAtualizarDTO";
import {
  MetaStatusFiltroEnum,
  MetaTipoEnum,
  MetaTipoFiltroEnum,
} from "@/domain/enum/comercial/Meta.enum";

interface MetaContextData {
  metas: Meta[];
  loading: boolean;
  filtroTipo: MetaTipoFiltroEnum;
  filtroStatus: MetaStatusFiltroEnum;
  setFiltroTipo: React.Dispatch<React.SetStateAction<MetaTipoFiltroEnum>>;
  setFiltroStatus: React.Dispatch<React.SetStateAction<MetaStatusFiltroEnum>>;
  carregar(): Promise<void>;
  adicionar(meta: MetaInserirDTO): Promise<boolean>;
  atualizar(meta: MetaAtualizarDTO): Promise<boolean>;
}

const MetaContext = createContext<MetaContextData | undefined>(undefined);

export const MetaProvider = ({ children }: { children: ReactNode }) => {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastId, setLastId] = useState<string | null>(null);
  const [filtroTipo, setFiltroTipo] = useState<MetaTipoFiltroEnum>(
    MetaTipoFiltroEnum.TODOS
  );
  const [filtroStatus, setFiltroStatus] = useState<MetaStatusFiltroEnum>(
    MetaStatusFiltroEnum.TODOS
  );
  const metaService = new MetaService(new MetaApiService());

  const carregar = async (reset = false) => {
    if (loading || (!reset && !hasMore)) return;

    try {
      setLoading(true);

      const result = await metaService.buscarTodos({
        limite: 10,
        ultimoId: !reset ? lastId : null,
        tipo: filtroTipo !== MetaTipoFiltroEnum.TODOS ? getFiltroTipo() : null,
        status: filtroStatus,
      });
      setHasMore(result.temMais);
      setLastId(result.ultimoId);
      setMetas((prev) => (reset ? result.dados : [...prev, ...result.dados]));
    } catch (error) {
      setHasMore(false);
      ShowToast("error", "Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  const adicionar = async (meta: MetaInserirDTO) => {
    try {
      await metaService.inserir(meta);
      await carregar(true);
      ShowToast("success", "Meta adicionada com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao adicionar meta.");
      return false;
    }
  };

  const atualizar = async (meta: MetaAtualizarDTO) => {
    try {
      await metaService.atualizar(meta);
      await carregar(true);
      ShowToast("success", "Meta atualizada com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao atualizar meta.");
      return false;
    }
  };

  const getFiltroTipo = () => {
    return filtroTipo === MetaTipoFiltroEnum.PRODUCAO
      ? MetaTipoEnum.PRODUCAO
      : MetaTipoEnum.VENDA;
  };

  useEffect(() => {
    carregar(true);
  }, [filtroTipo, filtroStatus]);

  return (
    <MetaContext.Provider
      value={{
        metas,
        loading,
        filtroTipo,
        filtroStatus,
        setFiltroTipo,
        setFiltroStatus,
        carregar,
        adicionar,
        atualizar,
      }}
    >
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

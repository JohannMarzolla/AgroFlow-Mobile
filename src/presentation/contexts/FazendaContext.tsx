import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { ShowToast } from "../components/ui/Toast";
import { FazendaService } from "@/application/services/FazendaService";
import { Fazenda } from "@/domain/models/Fazenda";
import { FazendaApiService } from "@/infrastructure/services/producao/FazendaApiService";
import { FazendaInserirDTO } from "@/application/dtos/producao/fazenda/FazendaInserirDTO";

interface FazendaContextData {
  fazenda: Fazenda[];
  loading: boolean;
  carregar(): Promise<void>;
  adicionar(fazenda: FazendaInserirDTO): Promise<boolean>;
  // atualizar(meta: MetaAtualizarDTO): Promise<boolean>;
}

const FazendaContext = createContext<FazendaContextData | undefined>(undefined);

export const FazendaProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const userId = user?.userId;
  const [fazenda, setFazenda] = useState<Fazenda[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastId, setLastId] = useState<string | null>(null);
  const fazendaService = new FazendaService(new FazendaApiService());
  console.log("fazendas context", fazenda)

  const carregar = async (reset = false) => {
    if (loading || (!reset && !hasMore)) return;

    try {
      setLoading(true);

      const result = await fazendaService.buscarTodos({
        limite: 5,
        ultimoId: !reset ? lastId : null,
      });
      setHasMore(result.temMais);
      setLastId(result.ultimoId);
      setFazenda((prev) => (reset ? result.dados : [...prev, ...result.dados]));
    } catch (error) {
      setHasMore(false);
      ShowToast("error", "Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  const adicionar = async (dados: FazendaInserirDTO) => {
    try {
      await fazendaService.inserir(dados);
      await carregar(true);
      ShowToast("success", "Meta adicionada com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao adicionar meta.");
      return false;
    }
  };

  useEffect(() => {
    carregar();
  }, [userId]);

  return (
    <FazendaContext.Provider
      value={{ 
        fazenda, 
        loading,   
        carregar,  
        adicionar
      }}
    >
      {children}
    </FazendaContext.Provider>
  );
};

export const useFazenda = () => {
  const context = useContext(FazendaContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado. useFazenda deve estar dentro de FazendaProvider."
    );
  }
  return context;
};
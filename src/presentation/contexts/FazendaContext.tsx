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
import { ProducaoAdicionarForm } from "@/domain/models/ProducaoAdicionarForm";
import { ProducaoRepository } from "@/infrastructure/repositories/ProducaoRepository";
import { ProducaoService } from "@/application/services/ProducaoService";
import { ProdutoRepository } from "@/infrastructure/repositories/ProdutoRepository";
import { FazendaAdicionarForm } from "@/domain/models/FazendaAdicionarForm";
import { Fazenda } from "@/domain/models/Fazenda";
import { FazendaRepository } from "@/infrastructure/repositories/FazendaRepository";
import { FazendaService } from "@/application/services/FazendaService";


interface FazendaContextData {
  fazenda: Fazenda[];
  adicionarFazenda(fazenda:FazendaAdicionarForm): Promise<void>
}

const FazendaContext = createContext<FazendaContextData | undefined>(undefined);

export const FazendaProvider = ({ children }: { children: ReactNode }) => {
  const { userId } = useAuth(); 
  const [fazenda, setFazenda] = useState<Fazenda[]>([]);
  const fazendaService = new FazendaService(new FazendaRepository());

  const carregarFazenda = async () => {
    try {
      if (!userId) return;
      const fazendaCarregadas = await fazendaService.get(userId);
      setFazenda(fazendaCarregadas);
    } catch (error) {
      ShowToast("error", "Erro ao carregar produtos.");
    }
  };
  const adicionarFazenda = async (fazenda: FazendaAdicionarForm) => {
    try {
      if (!userId) return;
      await fazendaService.insert(userId, fazenda);
      await carregarFazenda(); 
      ShowToast("success", "Produto adicionado com sucesso.");
    } catch (error) {
      ShowToast("error", "Erro ao adicionar produto.");
    }
  };

 useEffect(() => {
    carregarFazenda();
  }, [userId]);

  return (
    <FazendaContext.Provider value={{ fazenda, adicionarFazenda }}>
      {children}
    </FazendaContext.Provider>
  );
}

export const useFazenda = () => {
  const context = useContext(FazendaContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado. useProdutos deve estar dentro de ProdutosProvider."
    );
  }
  return context;
};

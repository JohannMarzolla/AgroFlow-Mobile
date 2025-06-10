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
import { InsumoAdicionarForm } from "@/domain/models/InsumoAdicionarForm";
import { InsumoService } from "@/application/services/InsumoService";
import { InsumoRepository } from "@/infrastructure/repositories/InsumoRepository";


interface InsumoContextData {
  insumo: Insumo[];
  adicionarInsumo(insumo:InsumoAdicionarForm): Promise<void>
}

const InsumoContext = createContext<InsumoContextData | undefined>(undefined);

export const InsumoProvider = ({ children }: { children: ReactNode }) => {
  const { userId } = useAuth(); 
  const [insumo, setInsumo] = useState<Insumo[]>([]);
  const insumoService = new InsumoService(new InsumoRepository());

  const carregarInsumos = async () => {
    try {
      if (!userId) return;
      const insumoCarregados = await insumoService.get(userId);
      setInsumo(insumoCarregados);
    } catch (error) {
      ShowToast("error", "Erro ao carregar insumos.");
    }
  };
  const adicionarInsumo = async (insumo: InsumoAdicionarForm) => {
    try {
      if (!userId) return;
      await insumoService.insert(userId, insumo);
      await carregarInsumos(); 
      ShowToast("success", "insumo adicionado com sucesso.");
    } catch (error) {
      ShowToast("error", "Erro ao adicionar produto.");
    }
  };

 useEffect(() => {
    carregarInsumos();
  }, [userId]);

  return (
    <InsumoContext.Provider value={{ insumo, adicionarInsumo }}>
      {children}
    </InsumoContext.Provider>
  );
}

export const useInsumo = () => {
  const context = useContext(InsumoContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado. useProdutos deve estar dentro de InsumosProvider."
    );
  }
  return context;
};

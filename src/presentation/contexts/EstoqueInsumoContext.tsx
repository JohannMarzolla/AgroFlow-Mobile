import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { ShowToast } from "../components/ui/Toast";
import { EstoqueInsumoAdicionarForm } from "@/domain/models/EstoqueInsumoAdicionarForm";
import { EstoqueInsumo } from "@/domain/models/EstoqueInsumo";
import { EstoqueInsumoService } from "@/application/services/EstoqueInsumoService";
import { EstoqueInsumoRepository } from "@/infrastructure/repositories/EstoqueInsumoRepository";



interface EstoqueInsumoContextData {
  insumos: EstoqueInsumo[];
  adicionarEstoqueInsumo(estoqueINsumo:EstoqueInsumoAdicionarForm): Promise<void>
}

const EstoqueInsumoContext = createContext<EstoqueInsumoContextData | undefined>(undefined);

export const EstoqueInsumoProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const userId = user?.userId  
  const [insumos, setInsumos] = useState<EstoqueInsumo[]>([]);
  const estoqueInsumoService = new EstoqueInsumoService(new EstoqueInsumoRepository());

  const carregarEstoqueInsumo = async () => {
    try {
      if (!userId) return;
      const insumosCarregados = await estoqueInsumoService.get(userId);
      setInsumos(insumosCarregados);
    } catch (error) {
      ShowToast("error", "Erro ao carregar insumos.");
    }
  };
  const   adicionarEstoqueInsumo = async (estoqueInsumos: EstoqueInsumoAdicionarForm) => {
    try {
      if (!userId) return;
      await estoqueInsumoService.insert(userId, estoqueInsumos);
      await carregarEstoqueInsumo(); 
      ShowToast("success", "estoque adicionado com sucesso.");
    } catch (error) {
      ShowToast("error", "Erro ao adicionar produto.");
    }
  };

 useEffect(() => {
     carregarEstoqueInsumo();
  }, [userId]);

  return (
    <EstoqueInsumoContext.Provider value={{ insumos, adicionarEstoqueInsumo }}>
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

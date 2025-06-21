import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { ShowToast } from "../components/ui/Toast";
import { Medida } from "@/domain/models/Medida";
import { MedidaAdicionarForm } from "@/domain/models/MedidaAdiconarForm";
import { MedidaRepository } from "@/infrastructure/repositories/MedidaRepository";
import { MedidasService } from "@/application/services/MedidaService";


interface MedidaContextData {
  medida: Medida[];
  adicionarMedida(medida:MedidaAdicionarForm): Promise<void>
}

const MedidaContext = createContext<MedidaContextData | undefined>(undefined);

export const MedidaProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth(); 
  const userId = user?.userId 
  const [medida, setMedida] = useState<Medida[]>([]);
  const medidaService = new MedidasService(new MedidaRepository());


  const carregarMedidas = async () => {
    try {
      if (!userId) return;
      const medidasCarregadas = await medidaService.get(userId);
      setMedida(medidasCarregadas);
    } catch (error) {
      ShowToast("error", "Erro ao carregar medidas.");
    }
  };
  const adicionarMedida = async (medida: MedidaAdicionarForm) => {
    try {
      if (!userId) return;
      await medidaService.insert(userId, medida);
      await carregarMedidas(); 
      ShowToast("success", "Produto adicionado com sucesso.");
    } catch (error) {
      ShowToast("error", "Erro ao adicionar produto.");
    }
  };

 useEffect(() => {
    carregarMedidas();
  }, [userId]);

  return (
    <MedidaContext.Provider value={{ medida, adicionarMedida }}>
      {children}
    </MedidaContext.Provider>
  );
}

export const useMedida = () => {
  const context = useContext(MedidaContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado. useProdutos deve estar dentro de MedidasProvider."
    );
  }
  return context;
};

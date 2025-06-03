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


interface ProducaoContextData {
  producao: Producao[];
  adicionarProducao(producao:ProducaoAdicionarForm): Promise<void>
}

const ProducaoContext = createContext<ProducaoContextData | undefined>(undefined);

export const ProducaoProvider = ({ children }: { children: ReactNode }) => {
  const { userId } = useAuth(); 
  const [producao, setProducao] = useState<Producao[]>([]);
  const producaoRepository = new ProducaoRepository();
  const produtoRepository = new ProdutoRepository();
  const producaoService = new ProducaoService(produtoRepository, producaoRepository);

  const carregarProducao = async () => {
    console.log("chamando carregar producao")
    try {
      if (!userId) return;
      const producaoCarregados = await producaoService.get(userId);
      setProducao(producaoCarregados);
    } catch (error) {
      ShowToast("error", "Erro ao carregar produtos.");
    }
  };
  const adicionarProducao = async (producao: ProducaoAdicionarForm) => {
    console.log("adicionar producao contexto ", producao)
    try {
      if (!userId) return;
      await producaoService.insert(userId, producao);
      await carregarProducao(); 
      ShowToast("success", "Produto adicionado com sucesso.");
    } catch (error) {
      ShowToast("error", "Erro ao adicionar produto.");
    }
  };

 useEffect(() => {
    carregarProducao();
  }, [userId]);

  return (
    <ProducaoContext.Provider value={{ producao, adicionarProducao }}>
      {children}
    </ProducaoContext.Provider>
  );
}

export const useProducao = () => {
  const context = useContext(ProducaoContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado. useProdutos deve estar dentro de ProdutosProvider."
    );
  }
  return context;
};

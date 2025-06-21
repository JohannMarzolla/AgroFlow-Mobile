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
import { EstoqueProdutoRepository } from "@/infrastructure/repositories/EstoqueProdutoRepository";


interface ProducaoContextData {
  producao: Producao[];
  adicionarProducao(producao:ProducaoAdicionarForm): Promise<void>;
  updateProducao(producao: Producao): Promise<void> 
}

const ProducaoContext = createContext<ProducaoContextData | undefined>(undefined);

export const ProducaoProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const userId = user?.userId 
  const [producao, setProducao] = useState<Producao[]>([]);
  const producaoRepository = new ProducaoRepository();
  const produtoRepository = new ProdutoRepository();
  const estoqueRepository = new EstoqueProdutoRepository
  const producaoService = new ProducaoService(produtoRepository, producaoRepository,estoqueRepository );

  const carregarProducao = async () => {
    try {
      if (!userId) return;
      const producaoCarregados = await producaoService.get(userId);
      setProducao(producaoCarregados);
    } catch (error) {
      ShowToast("error", "Erro ao carregar produtos.");
    }
  };
  const adicionarProducao = async (producao: ProducaoAdicionarForm) => {
    try {
      if (!userId) return;
      await producaoService.insert(userId, producao);
      await carregarProducao(); 
      ShowToast("success", "Produto adicionado com sucesso.");
    } catch (error) {
      ShowToast("error", "Erro ao adicionar produto.");
    }
  };
  const updateProducao = async (producao: Producao) => {  // Mudança aqui: ProducaoAdicionarForm -> Producao
    try {
      if (!userId) return;
      await producaoService.update(userId, producao);
      await carregarProducao(); 
      ShowToast("success", "Produção atualizada com sucesso.");  // Mensagem corrigida
    } catch (error) {
      ShowToast("error", "Erro ao atualizar produção.");  // Mensagem corrigida
    }
  };
  

 useEffect(() => {
    carregarProducao();
  }, [userId]);

  return (
    <ProducaoContext.Provider value={{ producao, adicionarProducao, updateProducao }}>
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

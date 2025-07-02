import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { ShowToast } from "../components/ui/Toast";
import { EstoqueProduto } from "@/domain/models/EstoqueProduto";
import { EstoqueProdutoAdicionarForm } from "@/domain/models/EstoqueProdutoAdicionarForm";
import { EstoqueProdutoService } from "@/application/services/EstoqueProdutoService";
import { EstoqueProdutoRepository } from "@/infrastructure/repositories/EstoqueProdutoRepository";
import { eventBus } from "@/shared/utils/EventBus";


interface EstoqueProdutoContextData {
  produtos: EstoqueProduto[];
  adicionarEstoqueProduto(estoqueProduto: EstoqueProdutoAdicionarForm ): Promise<void>;
}

const EstoqueProdutoContext = createContext<EstoqueProdutoContextData | undefined>(undefined);

export const EstoqueProdutoProvider = ({ children }: { children: ReactNode }) => {
  const { user} = useAuth();
  const userId = user?.userId  
  const [produtos, setProdutos] = useState<EstoqueProduto[]>([]);
  const estoqueProdutoService = new EstoqueProdutoService(new EstoqueProdutoRepository());
 

  const carregarEstoqueProduto = async () => {
    try {
      if (!userId) return;
      const produtosCarregados = await estoqueProdutoService.get(userId);
      setProdutos(produtosCarregados);
    } catch (error) {
      ShowToast("error", "Erro ao carregar estoque de produtos.");
    }
  };

  const adicionarEstoqueProduto = async (estoqueProduto: EstoqueProdutoAdicionarForm) => {
    try {
      if (!userId) return;
      await estoqueProdutoService.insert(userId, estoqueProduto);
      await carregarEstoqueProduto(); 
      ShowToast("success", "Estoque de produto adicionado com sucesso.");
    } catch (error) {
      ShowToast("error", "Erro ao adicionar estoque de produto.");
    }
  };
  useEffect(() => {

    carregarEstoqueProduto(); 
  
    const atualizarEstoque = async () => {
      await carregarEstoqueProduto();
    };
  
    eventBus.on("estoqueProduto:adicionado", atualizarEstoque);
  
   
    return () => {
      eventBus.off("estoqueProduto:adicionado", atualizarEstoque);
    };
  }, [userId]);
  
  return (
    <EstoqueProdutoContext.Provider value={{ produtos, adicionarEstoqueProduto }}>
      {children}
    </EstoqueProdutoContext.Provider>
  );
};

export const useEstoqueProduto = () => {
  const context = useContext(EstoqueProdutoContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado. useEstoqueProduto deve estar dentro de EstoqueProdutoProvider."
    );
  }
  return context;
}; 
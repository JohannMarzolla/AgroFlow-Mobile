import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { Produto } from "@/domain/models/Produto";
import { ShowToast } from "../components/ui/Toast";
import { ProdutoService } from "@/application/services/ProdutoService";
import { ProdutoRepository } from "@/infrastructure/repositories/ProdutoRepository";
import { ProdutoAdiconarForm } from "@/domain/models/ProdutoAdicionarForm";

interface ProducaoContextData {
  produtos: Produto[];
  adicionarProduto(produto:ProdutoAdiconarForm): Promise<void>
}

const ProducaoContext = createContext<ProducaoContextData | undefined>(undefined);

export const ProducaoProvider = ({ children }: { children: ReactNode }) => {
  const { userId } = useAuth(); 
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const produtoRepository = new ProdutoRepository();
  const produtoService = new ProdutoService(produtoRepository);

  const carregarProdutos = async () => {
    console.log("chamando carregar produtos")
    try {
      if (!userId) return;
      const produtosCarregados = await produtoService.get(userId);
      setProdutos(produtosCarregados);
    } catch (error) {
      ShowToast("error", "Erro ao carregar produtos.");
    }
  };
  const adicionarProduto = async (produto: ProdutoAdiconarForm) => {
    try {
      if (!userId) return;
      await produtoService.insert(userId, produto);
      await carregarProdutos(); 
      ShowToast("success", "Produto adicionado com sucesso.");
    } catch (error) {
      ShowToast("error", "Erro ao adicionar produto.");
    }
  };

 useEffect(() => {
    carregarProdutos();
  }, [userId]);

  return (
    <ProducaoContext.Provider value={{ produtos, adicionarProduto }}>
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

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
import { ProdutoApiService } from "@/infrastructure/services/producao/ProdutoApiService";
import { ProdutoInserirDTO } from "@/application/dtos/producao/Produtos/ProdutoInserirDTO";
import { ProdutoAtualizarDTO } from "@/application/dtos/producao/Produtos/ProdutoAtualizarDTO";

interface ProdutoContextData {
  produtos: Produto[];
  loading: boolean;
  carregar(): Promise<void>;
  adicionar(produto: ProdutoInserirDTO): Promise<boolean>;
  atualizar(produto: ProdutoAtualizarDTO): Promise<boolean>;
}

const ProdutosContext = createContext<ProdutoContextData | undefined>(
  undefined
);

export const ProdutosProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const userId = user?.userId;
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastId, setLastId] = useState<string | null>(null);

  const produtoService = new ProdutoService(new ProdutoApiService());

  const carregar = async (reset = false) => {
    if (loading || (!reset && !hasMore)) return;

    try {
      setLoading(true);

      const result = await produtoService.buscarTodos({
        limite: 10,
        ultimoId: !reset ? lastId : null,
      });
      setHasMore(result.temMais);
      setLastId(result.ultimoId);
      setProdutos((prev) =>
        reset ? result.dados : [...prev, ...result.dados]
      );
    } catch (error) {
      setHasMore(false);
      ShowToast("error", "Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  const adicionar = async (dados: ProdutoInserirDTO) => {
    try {
      await produtoService.inserir(dados);
      await carregar(true);
      ShowToast("success", "Produto adicionado com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao adicionar produto.");
      return false;
    }
  };
  const atualizar = async (produto: Produto) => {
    try {
      await produtoService.atualizar(produto);
      await carregar(true);
      ShowToast("success", "Produção atualizada com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao atualizar produção.");
      return false;
    }
  };

  useEffect(() => {
    carregar(true);
  }, [userId]);

  return (
    <ProdutosContext.Provider
      value={{ produtos, loading, carregar, adicionar, atualizar }}
    >
      {children}
    </ProdutosContext.Provider>
  );
};

export const useProdutos = () => {
  const context = useContext(ProdutosContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado. useProdutos deve estar dentro de ProdutosProvider."
    );
  }
  return context;
};

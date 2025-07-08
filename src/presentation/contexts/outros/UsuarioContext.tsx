import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ShowToast } from "@/presentation/components/ui/Toast";
import { UsuarioInserirDTO } from "@/application/dtos/outros/usuario/UsuarioInserirDTO";
import { Usuario } from "@/domain/models/outros/Usuario";
import { UsuarioApiService } from "@/infrastructure/services/outros/UsuarioApiService";
import { UsuarioService } from "@/application/services/outros/UsuarioService";

interface UsuarioContextData {
  usuarios: Usuario[];
  loading: boolean;
  carregar(): Promise<void>;
  adicionar(meta: UsuarioInserirDTO): Promise<boolean>;
}

const UsuarioContext = createContext<UsuarioContextData | undefined>(undefined);

export const UsuarioProvider = ({ children }: { children: ReactNode }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastId, setLastId] = useState<string | null>(null);
  const metaService = new UsuarioService(new UsuarioApiService());

  const carregar = async (reset = false) => {
    if (loading || (!reset && !hasMore)) return;

    try {
      setLoading(true);

      const result = await metaService.buscarTodos({
        limite: 5,
        ultimoId: !reset ? lastId : null,
      });
      setHasMore(result.temMais);
      setLastId(result.ultimoId);
      setUsuarios((prev) =>
        reset ? result.dados : [...prev, ...result.dados]
      );
    } catch (error) {
      setHasMore(false);
      ShowToast("error", "Erro ao carregar usuarios.");
    } finally {
      setLoading(false);
    }
  };

  const adicionar = async (meta: UsuarioInserirDTO) => {
    try {
      await metaService.inserir(meta);
      await carregar(true);
      ShowToast("success", "Usuario adicionada com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao adicionar meta.");
      return false;
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <UsuarioContext.Provider value={{ usuarios, loading, carregar, adicionar }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado. useUsuario deve estar dentro de UsuarioProvider."
    );
  }
  return context;
};

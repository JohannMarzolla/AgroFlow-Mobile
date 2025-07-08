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
import { UsuarioAtualizarDTO } from "@/application/dtos/outros/usuario/UsuarioAtualizarDTO";

interface UsuarioContextData {
  usuarios: Usuario[];
  loading: boolean;
  carregar(): Promise<void>;
  adicionar(usuario: UsuarioInserirDTO): Promise<boolean>;
  atualizar(usuario: UsuarioAtualizarDTO): Promise<boolean>;
  recuperarSenha(usuarioId: string): Promise<boolean>;
}

const UsuarioContext = createContext<UsuarioContextData | undefined>(undefined);

export const UsuarioProvider = ({ children }: { children: ReactNode }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastId, setLastId] = useState<string | null>(null);
  const usuarioService = new UsuarioService(new UsuarioApiService());

  const carregar = async (reset = false) => {
    if (loading || (!reset && !hasMore)) return;

    try {
      setLoading(true);

      const result = await usuarioService.buscarTodos({
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

  const adicionar = async (usuario: UsuarioInserirDTO) => {
    try {
      await usuarioService.inserir(usuario);
      await carregar(true);
      ShowToast("success", "Usuario adicionado com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao adicionar usuario.");
      return false;
    }
  };

  const atualizar = async (usuario: UsuarioAtualizarDTO) => {
    try {
      await usuarioService.atualizar(usuario);
      await carregar(true);
      ShowToast("success", "Usuario atualizado com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao atualizar usuario.");
      return false;
    }
  };

  const recuperarSenha = async (usuarioId: string) => {
    try {
      await usuarioService.recuperarSenha(usuarioId);
      ShowToast("success", "Link de recuperação de senha enviado com sucesso.");
      return true;
    } catch (error) {
      ShowToast("error", "Erro ao recuperar senha do usuario.");
      return false;
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <UsuarioContext.Provider
      value={{
        usuarios,
        loading,
        carregar,
        adicionar,
        atualizar,
        recuperarSenha,
      }}
    >
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

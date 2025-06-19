import { ShowToast } from "@/presentation/components/ui/Toast";
import { createContext, ReactNode, useContext, useState } from "react";
import { AuthService } from "@/application/services/AuthService";
import { UsuarioLogado } from "@/domain/models/UsuarioLogado";

interface IAuthContext {
  isAuthenticated: boolean;
  user: UsuarioLogado | null;
  validateLogged: () => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UsuarioLogado | null>(null);
  const [refreshTimeout, setRefreshTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const login = async (email: string, password: string) => {
    try {
      const user = await AuthService.login(email, password);
      setIsAuthenticated(!!user);
      setUser(user);
      if (user) scheduleTokenRefresh(user);
      return !!user;
    } catch (error) {
      if (error instanceof Error) {
        ShowToast(
          "error",
          error.message || "Erro desconhecido ao fazer login."
        );
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
      setIsAuthenticated(false);
      if (refreshTimeout) clearTimeout(refreshTimeout);
    } catch (error) {
      if (error instanceof Error) {
        ShowToast("error", error.message);
      }
    }
  };

  const validateLogged = async () => {
    if (isAuthenticated) return true;

    const user = await AuthService.getLoggedUser();
    setIsAuthenticated(!!user);
    setUser(user);
    if (user) scheduleTokenRefresh(user);
    return !!user;
  };

  const scheduleTokenRefresh = async (user: UsuarioLogado) => {
    const expiration = new Date(user.expiresIn).getTime();
    const now = Date.now();
    const timeUntilExpiration = expiration - now;

    // Atualiza 1 minuto antes do vencimento
    const refreshTime = timeUntilExpiration - 60 * 1000;

    if (refreshTime > 0) {
      const timeout = setTimeout(async () => {
        const newUser = await AuthService.refreshAccess(user.refreshToken);
        setIsAuthenticated(!!newUser);
        setUser(newUser);
        if (newUser) scheduleTokenRefresh(newUser);
      }, refreshTime);

      setRefreshTimeout(timeout);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        validateLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "contexto não encontado, useAuth deve estar dentro de AuthProvider"
    );
  }
  return context;
};

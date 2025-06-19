import { UsuarioLogado } from "@/domain/models/UsuarioLogado";
import { AuthApiService } from "@/infrastructure/services/AuthApiService";

export class AuthService {
  static async login(email: string, password: string) {
    return AuthApiService.signIn(email, password);
  }

  static async logout() {
    await AuthApiService.signOut();
  }

  static async refreshAccess(
    refreshToken: string
  ): Promise<UsuarioLogado | null> {
    return AuthApiService.refreshAccess(refreshToken);
  }

  static async getLoggedUser() {
    return AuthApiService.getLoggedUser();
  }
}

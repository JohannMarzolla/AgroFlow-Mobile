import { UsuarioLogado } from "@/domain/models/UsuarioLogado";
import { LoginDTO } from "../../dtos/LoginDTO";
import { LoginResponseDTO } from "../../dtos/LoginResponseDTO";
import { HttpClient } from "../base/HttpClient";
import { UserTokenService } from "../base/UserTokenService";

export class AuthApiService {
  static async signIn(email: string, password: string): Promise<UsuarioLogado> {
    try {
      const response = await HttpClient.post<LoginDTO, LoginResponseDTO>(
        "auth/login",
        { email, password }
      );

      const userLogged = this._createUsuarioLogado(response);
      UserTokenService.getInstance().set(userLogged);
      return userLogged;
    } catch (error: any) {
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar fazer login");
    }
  }

  static async signOut(): Promise<void> {
    try {
      await HttpClient.post("auth/logout");
    } catch (error: any) {
      return;
    }
  }

  static async refreshAccess(
    refreshToken: string
  ): Promise<UsuarioLogado | null> {
    try {
      const response = await HttpClient.post("auth/refresh", { refreshToken });
      const userLogged = this._createUsuarioLogado(response);
      UserTokenService.getInstance().set(userLogged);
      return userLogged;
    } catch (error: any) {
      return null;
    }
  }

  static async getLoggedUser(): Promise<UsuarioLogado | null> {
    try {
      const user = await UserTokenService.getInstance().get();
      if (!user) return null;

      return this.validateTokenExpired(user)
        ? this.refreshAccess(user.refreshToken)
        : user;
    } catch (error: any) {
      return null;
    }
  }

  static validateTokenExpired(user: UsuarioLogado) {
    const expirationTime = new Date(user.expiresIn);
    return expirationTime <= new Date();
  }

  private static _createUsuarioLogado(dto: LoginResponseDTO) {
    return {
      refreshToken: dto.refreshToken,
      token: dto.token,
      userId: dto.userId,
      expiresIn: dto.expiresIn,
    };
  }
}

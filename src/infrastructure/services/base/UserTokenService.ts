import { UsuarioLogado } from "@/domain/models/outros/UsuarioLogado";
import * as SecureStore from "expo-secure-store";

export class UserTokenService {
  private static instance: UserTokenService;
  private readonly key = "user";

  static getInstance() {
    if (!UserTokenService.instance) {
      UserTokenService.instance = new UserTokenService();
    }
    return UserTokenService.instance;
  }

  async set(userLogged: UsuarioLogado): Promise<void> {
    await SecureStore.setItemAsync(this.key, JSON.stringify(userLogged));
  }

  async get(): Promise<UsuarioLogado | null> {
    const jsonValue = await SecureStore.getItemAsync(this.key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  }

  async clear(): Promise<void> {
    await SecureStore.deleteItemAsync(this.key);
  }
}

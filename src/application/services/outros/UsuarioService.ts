import { UsuarioApiService } from "@/infrastructure/services/outros/UsuarioApiService";

export class UsuarioService {
  static async cadastrar(email: string, password: string) {
    await UsuarioApiService.cadastrar(email, password);
  }
}

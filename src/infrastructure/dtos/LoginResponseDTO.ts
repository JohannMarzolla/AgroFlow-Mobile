import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";

export interface LoginResponseDTO {
  userId: string;
  nome: string;
  setor: UsuarioSetorEnum;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

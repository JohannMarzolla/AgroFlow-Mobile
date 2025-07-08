import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";

export interface Usuario {
  id: string;
  email: string;
  nome: string;
  setor: UsuarioSetorEnum;
  criadaEm: Date;
  primeiroAcesso?: boolean;
}

export interface UsuarioLogado {
  userId: string;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

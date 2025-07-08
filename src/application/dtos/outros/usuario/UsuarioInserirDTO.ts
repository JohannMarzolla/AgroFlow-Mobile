import { UsuarioSetorEnumZod } from "@/domain/enum/outros/usuario.enum";
import { z } from "zod";

export const UsuarioInserirSchema = z.object({
  email: z.string().email("E-mail inválido"),
  nome: z.string().min(2, "Nome é obrigatório"),
  setor: UsuarioSetorEnumZod,
});

export type UsuarioInserirDTO = z.infer<typeof UsuarioInserirSchema>;

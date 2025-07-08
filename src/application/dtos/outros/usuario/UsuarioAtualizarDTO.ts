import { UsuarioSetorEnumZod } from "@/domain/enum/outros/usuario.enum";
import { z } from "zod";

export const UsuarioAtualizarSchema = z.object({
  id: z.string().min(1, "ID é obrigatório"),
  nome: z.string().min(2, "Nome é obrigatório"),
  setor: UsuarioSetorEnumZod,
});

export type UsuarioAtualizarDTO = z.infer<typeof UsuarioAtualizarSchema>;

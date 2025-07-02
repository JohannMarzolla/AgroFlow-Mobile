import { z } from "zod";


export const FazendaInserirBaseSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"), 
});

export const FazendaInserirSchema = FazendaInserirBaseSchema; 
export type FazendaInserirDTO = z.infer<typeof FazendaInserirSchema>;
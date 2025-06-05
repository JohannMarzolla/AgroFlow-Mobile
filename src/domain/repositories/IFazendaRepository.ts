import { Fazenda } from "../models/Fazenda";
import { FazendaAdicionarForm } from "../models/FazendaAdicionarForm";

export interface IFazendaRepository{
    getAll(userId: string ): Promise<Fazenda[]>
    getByID(userId: string , fazendaId : string): Promise<Fazenda>
    insert(userId: string, fazenda: FazendaAdicionarForm ): Promise<void>
}
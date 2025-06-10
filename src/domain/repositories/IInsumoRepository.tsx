import { Insumo } from "../models/Insumo";
import { InsumoAdicionarForm } from "../models/InsumoAdicionarForm";

export interface IINsumoRepository{
    getAll(userId:string): Promise<Insumo[]>
    insert(userId: string , insumo:InsumoAdicionarForm): Promise<void>
}
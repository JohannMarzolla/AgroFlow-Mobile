import { Medida } from "../models/Medida";
import { MedidaAdicionarForm } from "../models/MedidaAdiconarForm";

export interface IMedidaRepository{
    getAll(userid: string): Promise<Medida[]>,
    insert(userid: string , medida:MedidaAdicionarForm): Promise<void>,
}
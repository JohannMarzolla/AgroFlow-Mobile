import { Producao } from "../models/Producao";
import { ProducaoAdicionarForm } from "../models/ProducaoAdicionarForm";

export interface IProducaoRepository{
    getAll(userId: string ):Promise<Producao[]>;
    insert(userId: string , producao: ProducaoAdicionarForm):Promise<void>;
}

import { EstoqueInsumo } from "../models/EstoqueInsumo";
import { EstoqueInsumoAdicionarForm } from "../models/EstoqueInsumoAdicionarForm";


export interface IEstoqueInsumoRepository{
    getAll(userId: string): Promise<EstoqueInsumo[]>,
    insert(userId: string , insumoEstoque:EstoqueInsumoAdicionarForm):Promise<void>

}
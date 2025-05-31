import { Produto } from "./Produto";

export interface ProducaoAdicionarForm{
    quantidade: number;
    status: string;
    data : Date
    produto:Produto;

}
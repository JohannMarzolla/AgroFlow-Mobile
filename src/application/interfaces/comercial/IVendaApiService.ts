import { VendaAtualizarDTO } from "@/application/dtos/comercial/meta/Venda/VendaAtualizarDTO";
import { VendaBuscarTodosDTO } from "@/application/dtos/comercial/meta/Venda/VendaBuscarTodosDTO";
import { VendaBuscarTodosResponseDTO } from "@/application/dtos/comercial/meta/Venda/VendaBuscarTodosResponseDTO";
import { VendaInserirDTO } from "@/application/dtos/comercial/meta/Venda/VendaInserirDTO";

export interface IVendaApiService {
    buscarTodos(dto: VendaBuscarTodosDTO): Promise<VendaBuscarTodosResponseDTO>;
    inserir(dados: VendaInserirDTO): Promise<void>;
    atualizar(dados: VendaAtualizarDTO): Promise<void>;
  }
// Importe a interface se você criar uma IVendaApiService
// import { IVendaApiService } from "@/application/interfaces/comercial/IVendaApiService";

import { VendaAtualizarDTO } from "@/application/dtos/comercial/Venda/VendaAtualizarDTO";
import { VendaBuscarTodosDTO } from "@/application/dtos/comercial/Venda/VendaBuscarTodosDTO";
import { VendaBuscarTodosResponseDTO } from "@/application/dtos/comercial/Venda/VendaBuscarTodosResponseDTO";
import { VendaInserirDTO } from "@/application/dtos/comercial/Venda/VendaInserirDTO";

export class VendaService {
  // Troque IVendaApiService se você criar a interface
  constructor(public apiService: any) {}

  async buscarTodos(
    dto: VendaBuscarTodosDTO
  ): Promise<VendaBuscarTodosResponseDTO> {
    return this.apiService.buscarTodos(dto);
  }

  async inserir(dados: VendaInserirDTO): Promise<void> {
    return this.apiService.inserir(dados);
  }

  async atualizar(dados: VendaAtualizarDTO): Promise<void> {
    return this.apiService.atualizar(dados);
  }
}

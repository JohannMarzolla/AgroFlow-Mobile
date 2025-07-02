// import { FazendaBuscarTodosDTO } from "@/application/dtos/producao/fazenda/FazendaBuscarTodosDTO";
// import { HttpClient } from "../base/HttpClient";
// import { FazendaBuscarTodosResponseDTO } from "@/application/dtos/producao/fazenda/FazendaBuscarTodosResponseDTO";
// import { FazendaInserirDTO } from "@/application/dtos/producao/fazenda/FazendaInserirDTO";
// import { IFazendaApiService } from "@/application/interfaces/producao/IFazendaApiService";


// export class EstoqueInsumoApiService implements IEstoqueInsumoApiService {

//   async buscarTodos(
//     dto: EstoqueInsumoBuscarTodosDTO
//   ): Promise<EstoqueInsumoBuscarTodosResponseDTO> {
//     try {
//       return HttpClient.post<EstoqueInsumoBuscarTodosDTO, EstoqueInsumoBuscarTodosResponseDTO>(
//         "estoqueInsumo/",
//         dto
//       );
//     } catch (error: any) {
//       console.error("Erro ao buscar todas os estoques de insumos", error);
//       throw error instanceof Error
//         ? error
//         : new Error("Erro desconhecido ao buscar todas os estoques de insumos");
//     }
//   }

//   async inserir(dto: EstoqueInsumoInserirDTO): Promise<void> {
//     try {
//       await HttpClient.post<EstoqueInsumoInserirDTO, void>("estoqueInsumo/inserir", dto);
//     } catch (error: any) {
//       console.error("Erro ao inserir estoqueInsumo", error);
//       throw error instanceof Error
//         ? error
//         : new Error("Erro desconhecido ao tentar cadastrar estoqueInsumo");
//     }
//   }

//   // async atualizar(dto: FazendaAtualizarDTO): Promise<void> {
//   //   try {
//   //     await HttpClient.post<FazendaAtualizarDTO, void>("fazenda/atualizar", dto);
//   //   } catch (error: any) {
//   //     console.error("Erro ao atualizar fazenda", error);
//   //     throw error instanceof Error
//   //       ? error
//   //       : new Error("Erro desconhecido ao tentar atualizar fazenda");
//   //   }
//   // }
// }

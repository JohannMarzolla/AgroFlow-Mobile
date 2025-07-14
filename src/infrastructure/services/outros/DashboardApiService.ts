import { DashboardProducaoPorStatusDTO } from "@/application/dtos/outros/DashboardProducaoPorStatusDTO";
import { HttpClient } from "../base/HttpClient";
import { IDashboardApiService } from "@/application/interfaces/outros/IDashboardApiService";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { DashboardProducaoProduzidoVsPerdasDTO } from "@/application/dtos/outros/DashboardProducaoProduzidoVsPerdasDTO";
import { DashboardLucroPorProdutoDTO } from "@/application/dtos/outros/DashboardLucroPorProdutoDTO";

export class DashboardApiService implements IDashboardApiService {
  async buscarProducaoPorStatus(): Promise<DashboardProducaoPorStatusDTO[]> {
    try {
      return HttpClient.get<DashboardProducaoPorStatusDTO[]>(
        "dashboard/producaoPorStatus"
      );
    } catch (error: any) {
      throw error instanceof Error
        ? error
        : new Error(
            "Erro desconhecido ao tentar buscar a quantidade de produções para cada status"
          );
    }
  }

  async buscarProducaoProduzidoVsPerdas(): Promise<DashboardProducaoProduzidoVsPerdasDTO> {
    try {
      return HttpClient.get<DashboardProducaoProduzidoVsPerdasDTO>(
        "dashboard/producaoProduzidoVsPerdas"
      );
    } catch (error: any) {
      throw error instanceof Error
        ? error
        : new Error(
            "Erro desconhecido ao tentar buscar a quantidade produzida e de perda das produções"
          );
    }
  }

  async buscarLucroPorProduto(): Promise<DashboardLucroPorProdutoDTO[]> {
    try {
      return HttpClient.get<DashboardLucroPorProdutoDTO[]>(
        "dashboard/lucroPorProduto"
      );
    } catch (error: any) {
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar buscar o lucro por produto");
    }
  }

  escutarProducaoPorStatus(callback: () => void): () => void {
    const ref = doc(db, "dashboard", "producaoPorStatus");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (snapshot.exists()) callback();
    });

    return unsubscribe;
  }

  escutarProducaoProduzidoVsPerdas(callback: () => void): () => void {
    const ref = collection(db, "dashboard", "producaoPerdas", "colhidas");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      callback();
    });

    return unsubscribe;
  }

  escutarLucroPorProduto(callback: () => void): () => void {
    const ref = collection(db, "dashboard", "produtoLucro", "registros");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      callback();
    });

    return unsubscribe;
  }
}

import { DashboardProducaoPorStatusDTO } from "@/application/dtos/outros/DashboardProducaoPorStatusDTO";
import { HttpClient } from "../base/HttpClient";
import { IDashboardApiService } from "@/application/interfaces/outros/IDashboardApiService";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../outros/FirebaseConfig";

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

  escutarProducaoPorStatus(callback: () => void): () => void {
    const ref = doc(db, "dashboard", "producaoPorStatus");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (snapshot.exists()) callback();
    });

    return unsubscribe;
  }
}

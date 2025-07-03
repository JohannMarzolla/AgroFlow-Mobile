import { Insumo } from "@/domain/models/Insumo";
import { IINsumoRepository } from "@/domain/repositories/IInsumoRepository";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../services/outros/FirebaseConfig";

export class InsumoRepository implements IINsumoRepository {
  async getAll(userId: string): Promise<Insumo[]> {
    if (!userId) throw new Error("Usuário não especificado");

    try {
      const insumoRef = collection(db, "users", userId, "insumo");
      const snapshot = await getDocs(insumoRef);

      const insumo: Insumo[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          nome: data.nome,
          unidadeMedida: data.unidadeMedida,
        };
      });

      return insumo;
    } catch (error) {
      throw new Error("Erro ao buscar insumos: " + (error as Error).message);
    }
  }
  async insert(userId: string, insumo: Insumo): Promise<void> {
    if (!insumo) throw new Error("Insumo não especificado");
    if (!userId) throw new Error("Usuário não especificado");
    try {
      const insumoRef = collection(db, "users", userId, "insumo");
      await addDoc(insumoRef, {
        nome: insumo.nome,
        unidadeMedida: insumo.unidadeMedida,
      });
    } catch (error) {
      throw new Error(
        "Erro ao adicionar insumo repository: " + (error as Error).message
      );
    }
  }
}

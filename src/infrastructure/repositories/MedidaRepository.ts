import { Medida } from "@/domain/models/Medida";
import { IMedidaRepository } from "@/domain/repositories/IMedidaRepository";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../services/FirebaseConfig";

export class MedidaRepository implements IMedidaRepository {
  async getAll(userId: string): Promise<Medida[]> {
    try {
      const medidasRef = collection(db, "users", userId, "medidas");
      const snapshot = await getDocs(medidasRef);
      
      const medidas: Medida[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return new Medida({
          id: doc.id,
          nome: data.nome,
          sigla: data.sigla
        });
      });

      return medidas;
    } catch (error) {
      throw new Error("Erro ao buscar medidas: " + (error as Error).message);
    }
  }

  async insert(userId: string, medida: Medida): Promise<void> {
     if (!userId) throw new Error("Usuário não especificado");
    try {
      const medidasRef = collection(db, "users", userId, "medidas");
      await addDoc(medidasRef, {
        nome: medida.nome,
        sigla: medida.sigla
      });
    } catch (error) {
      throw new Error("Erro ao inserir medida: " + (error as Error).message);
    }
  }
}
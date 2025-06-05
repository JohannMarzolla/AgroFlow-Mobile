import { Fazenda } from "@/domain/models/Fazenda";
import { IFazendaRepository } from "@/domain/repositories/IFazendaRepository";
import { addDoc, collection, doc, getDoc, getDocs,  } from "firebase/firestore";
import { db } from "../services/FirebaseConfig";

export class FazendaRepository implements IFazendaRepository {
  async getAll(userId: string): Promise<Fazenda[]> {
    try {
      const fazendaRef = collection(db, "users", userId, "fazenda");
      const snapshot = await getDocs(fazendaRef);
      
      const fazendas: Fazenda[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return new Fazenda({
          id: doc.id,
          nome: data.nome,
        });
      });

      return fazendas;
    } catch (error) {
      throw new Error("Erro ao buscar fazendas: " + (error as Error).message);
    }
  }

  async getByID(userId: string, fazendaId: string): Promise<Fazenda> {
    try {
      const fazendaDocRef = doc(db, "users", userId, "fazenda", fazendaId);
      const docSnap = await getDoc(fazendaDocRef);

      if (!docSnap.exists()) {
        throw new Error("Fazenda não encontrada.");
      }

      const data = docSnap.data();
      return new Fazenda({
        id: docSnap.id,
        nome: data.nome,
      });
    } catch (error) {
      throw new Error("Erro ao buscar fazenda por ID: " + (error as Error).message);
    }
  }

  async insert(userId: string, fazenda: Fazenda): Promise<void> {
     if (!userId) throw new Error("Usuário não especificado");
    try {
      const FazendaRef = collection(db, "users", userId, "fazenda");
      await addDoc(FazendaRef, {
        nome: fazenda.nome,
      });
    } catch (error) {
      throw new Error("Erro ao inserir fazenda: " + (error as Error).message);
    }
  }
}

import { addDoc, collection, getDocs} from "firebase/firestore";
import { db } from "../services/FirebaseConfig";
import { Producao } from "@/domain/models/Producao";
import { IProducaoRepository } from "@/domain/repositories/IProducaoRepository";

export class ProducaoRepository implements IProducaoRepository{
    async getAll(userId: string): Promise<Producao[]> {
    if (!userId) throw new Error("Usuário não especificado");

    try {
      const producaoRef = collection(db, "users", userId, "producao");
      const snapshot = await getDocs(producaoRef);

      const producao: Producao[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          quantidade: data.quantidade,
          status: data.status,
          data: data.data.toDate(),
          produto: data.produto 
        };
      });

      return producao;
    } catch (error) {
      throw new Error("Erro ao buscar produção: " + (error as Error).message);
    }
  }
  
  async insert(userId: string, producao: Producao): Promise<void> {
     if (!producao) throw new Error("Transação não especificada");
    if (!userId) throw new Error("Usuário não especificado");

    try {
      const produtosRef = collection(db, "users", userId, "produtos");
      await addDoc(produtosRef, {
        id: producao.id,
        quantidade: producao.quantidade,
        status:producao.status,
        data: producao.status,
        produto: producao.produto
      });
    } catch (error) {
      throw new Error("Erro ao adicionar produto: " + (error as Error).message);
    }
  }
}

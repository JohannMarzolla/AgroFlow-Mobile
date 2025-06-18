import {  addDoc, collection, getDocs,  } from "firebase/firestore";
import { db } from "../services/FirebaseConfig";
import { IEstoqueInsumoRepository } from "@/domain/repositories/IEstoqueInsumoRepository";
import { EstoqueInsumo } from "@/domain/models/EstoqueInsumo";


export class EstoqueInsumoRepository implements IEstoqueInsumoRepository {
  async getAll(userId: string): Promise<EstoqueInsumo[]> {
    try {
      const estoqueInsumoRef = collection(db, "users", userId, "EstoqueInsumo");
      const snapshot = await getDocs(estoqueInsumoRef);
      
      const estoqueInsumos: EstoqueInsumo[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return new EstoqueInsumo({
          id: doc.id,
          insumo: data.insumo,
          quantidade: data.quantidade,
          preco: data.preco
        });
      });

      return estoqueInsumos;
    } catch (error) {
      throw new Error("Erro ao buscar estoque insumos: " + (error as Error).message);
    }
  }


  async insert(userId: string, estoqueInsumo: EstoqueInsumo): Promise<void> {
     if (!userId) throw new Error("Usuário não especificado");
    try {
      const EstoqueInsumoRef = collection(db, "users", userId, "EstoqueInsumo");
      await addDoc(EstoqueInsumoRef, {
        insumo: estoqueInsumo.insumo,
        quantidade:estoqueInsumo.quantidade,
        preco:estoqueInsumo.preco
      });
    } catch (error) {
      throw new Error("Erro ao inserir estoque insumo: " + (error as Error).message);
    }
  }
}

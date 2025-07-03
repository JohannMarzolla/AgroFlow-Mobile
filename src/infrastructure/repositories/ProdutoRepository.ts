import { IProdutoRepository } from "@/domain/repositories/IProdutoRepository";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../services/outros/FirebaseConfig";
import { Produto } from "@/domain/models/Produto";

export class ProdutoRepository implements IProdutoRepository {
  async exists(userId: string, produtoId: string): Promise<boolean> {
    if (!userId || !produtoId)
      throw new Error("Usuário ou Produto não especificado");

    try {
      const produtoDocRef = doc(db, "users", userId, "produtos", produtoId);
      const produtoDoc = await getDoc(produtoDocRef);
      return produtoDoc.exists();
    } catch (error) {
      throw new Error(
        "Erro ao verificar existência do produto: " + (error as Error).message
      );
    }
  }
  async getAll(userId: string): Promise<Produto[]> {
    if (!userId) throw new Error("Usuário não especificado");

    try {
      const produtosRef = collection(db, "users", userId, "produtos");
      const snapshot = await getDocs(produtosRef);

      const produtos: Produto[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return new Produto({
          id: doc.id,
          nome: data.nome,
          unidadeMedida: data.unidadeMedida,
        });
      });

      return produtos;
    } catch (error) {
      throw new Error("Erro ao buscar produtos: " + (error as Error).message);
    }
  }

  async insert(userId: string, produto: Produto): Promise<void> {
    if (!userId) throw new Error("Usuário não especificado");

    try {
      const produtosRef = collection(db, "users", userId, "produtos");
      await addDoc(produtosRef, {
        nome: produto.nome,
        unidadeMedida: produto.unidadeMedida,
      });
    } catch (error) {
      throw new Error("Erro ao adicionar produto: " + (error as Error).message);
    }
  }
}

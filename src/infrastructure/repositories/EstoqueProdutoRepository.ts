import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../services/outros/FirebaseConfig";
import { IEstoqueProdutoRepository } from "@/domain/repositories/IEstoqueProdutoRepository";
import { EstoqueProduto } from "@/domain/models/EstoqueProduto";
import { EstoqueProdutoAdicionarForm } from "@/domain/models/EstoqueProdutoAdicionarForm";

export class EstoqueProdutoRepository implements IEstoqueProdutoRepository {
  async getAll(userId: string): Promise<EstoqueProduto[]> {
    try {
      const estoqueProdutoRef = collection(
        db,
        "users",
        userId,
        "EstoqueProduto"
      );
      const snapshot = await getDocs(estoqueProdutoRef);

      const estoqueProdutos: EstoqueProduto[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return new EstoqueProduto({
          id: doc.id,
          produto: data.produto,
          quantidade: data.quantidade,
          preco: data.preco,
        });
      });

      return estoqueProdutos;
    } catch (error) {
      throw new Error(
        "Erro ao buscar estoque produtos: " + (error as Error).message
      );
    }
  }

  async insert(
    userId: string,
    estoqueProduto: EstoqueProdutoAdicionarForm
  ): Promise<void> {
    if (!userId) throw new Error("Usuário não especificado");
    try {
      const EstoqueProdutoRef = collection(
        db,
        "users",
        userId,
        "EstoqueProduto"
      );
      await addDoc(EstoqueProdutoRef, {
        produto: estoqueProduto.produto,
        quantidade: estoqueProduto.quantidade,
        preco: estoqueProduto.preco,
      });
    } catch (error) {
      throw new Error(
        "Erro ao inserir estoque produto: " + (error as Error).message
      );
    }
  }
}

import {
  addDoc,
  collection,
  doc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/outros/FirebaseConfig";
import { Producao } from "@/domain/models/Producao";
import { IProducaoRepository } from "@/domain/repositories/IProducaoRepository";
import Fazenda from "@/app/(protected)/features/producaoModulo/fazenda/Fazenda";

export class ProducaoRepository implements IProducaoRepository {
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
          produto: data.produto,
          fazenda: data.fazenda,
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
      const producaoRef = collection(db, "users", userId, "producao");
      await addDoc(producaoRef, {
        quantidade: producao.quantidade,
        status: producao.status,
        data: Timestamp.fromDate(new Date(producao.data)),
        produto: producao.produto,
        fazenda: producao.fazenda,
      });
    } catch (error) {
      throw new Error(
        "Erro ao adicionar produto re´pository: " + (error as Error).message
      );
    }
  }
  async update(userId: string, producao: Producao): Promise<void> {
    console.log("chamando update no repository");
    if (!producao) throw new Error("Produção não especificada");
    if (!userId) throw new Error("Usuário não especificado");
    if (!producao.id)
      throw new Error("ID da produção é necessário para atualização");

    try {
      // 1. Criar referência ao documento específico
      const producaoRef = doc(db, "users", userId, "producao", producao.id);

      // 2. Preparar dados para atualização
      const updateData = {
        quantidade: producao.quantidade,
        status: producao.status,
        data: Timestamp.fromDate(new Date(producao.data)), // Convertendo Date para Timestamp
        produto: producao.produto,
        fazenda: producao.fazenda,
      };

      // 3. Atualizar documento existente
      await updateDoc(producaoRef, updateData);
    } catch (error) {
      throw new Error(
        "Erro ao atualizar produção: " + (error as Error).message
      );
    }
  }
}

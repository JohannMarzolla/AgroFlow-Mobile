import { IINsumoRepository } from "@/domain/repositories/IInsumoRepository";
import { InsumoAdicionarForm } from "@/domain/models/InsumoAdicionarForm";
import { Insumo } from "@/domain/models/Insumo";

export class InsumoService {
  constructor(
    private insumoRepo: IINsumoRepository,

  ) {}
  async get(userId: string): Promise<Insumo[]> {
        return await this.insumoRepo.getAll(userId)
    }

  async insert(userId: string, insumo: InsumoAdicionarForm): Promise<void> {
    await this.insumoRepo.insert(userId, insumo);
  }

}

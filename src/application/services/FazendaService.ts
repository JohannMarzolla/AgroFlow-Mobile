import { FazendaAdicionarForm } from "@/domain/models/FazendaAdicionarForm";
import { IFazendaRepository } from "@/domain/repositories/IFazendaRepository";

export class FazendaService {
     constructor(
        private fazendaRepo: IFazendaRepository,
      ) {}
    async get(userId: string){
        return await this.fazendaRepo.getAll(userId)

    }
    async insert(userId: string, fazenda: FazendaAdicionarForm){
        return await this.fazendaRepo.insert(userId, fazenda)

    }
}
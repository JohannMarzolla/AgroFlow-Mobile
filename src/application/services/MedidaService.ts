import { MedidaAdicionarForm } from "@/domain/models/MedidaAdiconarForm";
import { IMedidaRepository } from "@/domain/repositories/IMedidaRepository";


export class MedidasService{
    constructor(
        private medidaRepo : IMedidaRepository
    ){}

    async get(userId: string){
        return await this.medidaRepo.getAll(userId)

    }
    async insert(userId: string , medida : MedidaAdicionarForm){
        return await this.medidaRepo.insert(userId, medida)

    }
     
}
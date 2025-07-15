import { TypeDebt } from "../../domain/entities/TypeDebt";
import { TypeDebtRepository } from "../../domain/repositories/TypeDebtRepository";

export class GetTypeDebts {
  constructor(private typeDebtRepository: TypeDebtRepository) {}

  async execute(): Promise<TypeDebt[]> {
    try {
      return await this.typeDebtRepository.findAll();
    } catch (error) {
      throw new Error(`Failed to get debt types: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

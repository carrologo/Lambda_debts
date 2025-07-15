import { TypeDebt } from "../../domain/entities/TypeDebt";
import { TypeDebtRepository } from "../../domain/repositories/TypeDebtRepository";

export class UpdateTypeDebt {
  constructor(private typeDebtRepository: TypeDebtRepository) {}

  async execute(id: number, name: string): Promise<TypeDebt> {
    try {
      return await this.typeDebtRepository.update(id, { name });
    } catch (error) {
      throw new Error(`Failed to update type debt: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

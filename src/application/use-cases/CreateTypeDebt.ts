import { TypeDebt } from "../../domain/entities/TypeDebt";
import { TypeDebtRepository } from "../../domain/repositories/TypeDebtRepository";

export class CreateTypeDebt {
  constructor(private typeDebtRepository: TypeDebtRepository) {}

  async execute(id: number, name: string): Promise<TypeDebt> {
    try {
      const typeDebt = new TypeDebt(id, name);
      return await this.typeDebtRepository.save(typeDebt);
    } catch (error) {
      throw new Error(`Failed to create type debt: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

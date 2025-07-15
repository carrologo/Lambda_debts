import { TypeDebtRepository } from "../../domain/repositories/TypeDebtRepository";

export class DeleteTypeDebt {
  constructor(private typeDebtRepository: TypeDebtRepository) {}

  async execute(id: number): Promise<boolean> {
    try {
      return await this.typeDebtRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete type debt: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

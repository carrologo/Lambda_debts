import { VehicleDebt } from "../../domain/entities/VehicleDebt";
import { VehicleDebtRepository } from "../../domain/repositories/VehicleDebtRepository";

export class UpdateVehicleDebt {
  constructor(private vehicleDebtRepository: VehicleDebtRepository) {}

  async execute(id: number, debtData: Partial<VehicleDebt>): Promise<VehicleDebt | null> {
    try {
      return await this.vehicleDebtRepository.update(id, debtData);
    } catch (error) {
      throw new Error(`Failed to update vehicle debt: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

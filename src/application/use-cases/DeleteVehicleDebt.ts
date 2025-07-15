import { VehicleDebtRepository } from "../../domain/repositories/VehicleDebtRepository";

export class DeleteVehicleDebt {
  constructor(private vehicleDebtRepository: VehicleDebtRepository) {}

  async execute(id: number): Promise<boolean> {
    try {
      return await this.vehicleDebtRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete vehicle debt: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

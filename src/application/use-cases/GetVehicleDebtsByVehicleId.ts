import { VehicleDebt } from "../../domain/entities/VehicleDebt";
import { VehicleDebtRepository } from "../../domain/repositories/VehicleDebtRepository";

export class GetVehicleDebtsByVehicleId {
  constructor(private vehicleDebtRepository: VehicleDebtRepository) {}

  async execute(vehicleId: number): Promise<VehicleDebt[]> {
    try {
      return await this.vehicleDebtRepository.findByVehicleId(vehicleId);
    } catch (error) {
      throw new Error(`Failed to get vehicle debts: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

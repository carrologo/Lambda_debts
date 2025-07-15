import { VehicleDebt } from "../../domain/entities/VehicleDebt";
import { VehicleDebtRepository } from "../../domain/repositories/VehicleDebtRepository";

export class GetVehicleDebts {
  constructor(private vehicleDebtRepository: VehicleDebtRepository) {}

  async execute(): Promise<VehicleDebt[]> {
    try {
      return await this.vehicleDebtRepository.findAll();
    } catch (error) {
      throw new Error(`Failed to get vehicle debts: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

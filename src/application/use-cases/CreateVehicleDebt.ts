import { VehicleDebt } from "../../domain/entities/VehicleDebt";
import { VehicleDebtRepository } from "../../domain/repositories/VehicleDebtRepository";

export class CreateVehicleDebt {
  constructor(private vehicleDebtRepository: VehicleDebtRepository) {}

  async execute(debtData: {
    vehicle_id: number;
    type_debt_id: number;
    amount: number;
  }): Promise<VehicleDebt> {
    try {
      const vehicleDebt = new VehicleDebt(
        0, // El ID se generará en la base de datos
        debtData.vehicle_id,
        debtData.type_debt_id,
        debtData.amount,
        new Date(), // created_at se establecerá automáticamente
      );

      return await this.vehicleDebtRepository.save(vehicleDebt);
    } catch (error) {
      throw new Error(`Failed to create vehicle debt: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

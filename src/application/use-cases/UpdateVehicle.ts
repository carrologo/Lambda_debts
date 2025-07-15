import { Vehicle } from "../../domain/entities/Vehicle";
import { VehicleRepository } from "../../domain/repositories/VehicleRepository";

export class UpdateVehicle {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(id: number, vehicleData: Partial<Vehicle>): Promise<Vehicle | null> {
    try {
      return await this.vehicleRepository.update(id, vehicleData);
    } catch (error) {
      throw new Error(`Failed to update vehicle: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

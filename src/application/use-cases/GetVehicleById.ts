import { Vehicle } from "../../domain/entities/Vehicle";
import { VehicleRepository } from "../../domain/repositories/VehicleRepository";

export class GetVehicleById {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(id: number): Promise<Vehicle | null> {
    try {
      return await this.vehicleRepository.findById(id);
    } catch (error) {
      throw new Error(`Failed to get vehicle: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

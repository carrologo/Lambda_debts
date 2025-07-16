import { Vehicle } from "../../domain/entities/Vehicle";
import { VehicleRepository } from "../../domain/repositories/VehicleRepository";

export class GetVehicles {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(): Promise<Vehicle[]> {
    try {
      return await this.vehicleRepository.findAll();
    } catch (error) {
      throw new Error(`Failed to get vehicles: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

import { VehicleRepository } from "../../domain/repositories/VehicleRepository";

export class DeleteVehicle {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(id: number): Promise<boolean> {
    try {
      return await this.vehicleRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete vehicle: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

import { Vehicle } from "../../domain/entities/Vehicle";
import { VehicleRepository } from "../../domain/repositories/VehicleRepository";

export class CreateVehicle {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(vehicleData: {
    type: string;
    brand: string;
    line: string;
    version?: string;
    transmission?: string;
    traction?: string;
    fuel_type: string;
    kms: number;
    model: Date;
    displacement?: number;
    seat_material?: string;
    airbags?: boolean;
    url_images?: string;
    plate?: string;
  }): Promise<Vehicle> {
    try {
      const vehicle = new Vehicle(
        0, // El ID se generará en la base de datos
        vehicleData.type,
        vehicleData.brand,
        vehicleData.line,
        vehicleData.version || null,
        vehicleData.transmission || null,
        vehicleData.traction || null,
        vehicleData.fuel_type,
        vehicleData.kms,
        vehicleData.model,
        vehicleData.displacement || null,
        vehicleData.seat_material || null,
        vehicleData.airbags || null,
        vehicleData.url_images || null,
        vehicleData.plate || null
      );

      return await this.vehicleRepository.save(vehicle);
    } catch (error) {
      throw new Error(`Failed to create vehicle: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

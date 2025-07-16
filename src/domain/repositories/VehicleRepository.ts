import { Vehicle } from "../entities/Vehicle";

export interface VehicleRepository {
  save(vehicle: Vehicle): Promise<Vehicle>;
  findById(id: number): Promise<Vehicle | null>;
  findAll(): Promise<Vehicle[]>;
  update(id: number, vehicle: Partial<Vehicle>): Promise<Vehicle | null>;
  delete(id: number): Promise<boolean>;
}

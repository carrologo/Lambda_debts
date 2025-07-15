import { VehicleDebt } from "../entities/VehicleDebt";

export interface VehicleDebtRepository {
  save(vehicleDebt: VehicleDebt): Promise<VehicleDebt>;
  findById(id: number): Promise<VehicleDebt | null>;
  findByVehicleId(vehicleId: number): Promise<VehicleDebt[]>;
  findAll(): Promise<VehicleDebt[]>;
  update(id: number, vehicleDebt: Partial<VehicleDebt>): Promise<VehicleDebt | null>;
  delete(id: number): Promise<boolean>;
}

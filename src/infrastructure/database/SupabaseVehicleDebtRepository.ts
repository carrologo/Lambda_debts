import { createClient } from "@supabase/supabase-js";
import { VehicleDebt } from "../../domain/entities/VehicleDebt";
import { VehicleDebtRepository } from "../../domain/repositories/VehicleDebtRepository";

export class SupabaseVehicleDebtRepository implements VehicleDebtRepository {
  private supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_KEY || ""
  );

  async save(vehicleDebt: VehicleDebt): Promise<VehicleDebt> {
    const { data, error } = await this.supabase
      .from("vehicle_debt")
      .insert({
        vehicle_id: vehicleDebt.vehicle_id,
        type_debt_id: vehicleDebt.type_debt_id,
        amount: vehicleDebt.amount,
        due_date: vehicleDebt.due_date
      })
      .select()
      .single();

    if (error) {
      console.error("Error inserting vehicle debt:", error);
      throw new Error(error.message);
    }

    return new VehicleDebt(
      data.id,
      data.vehicle_id,
      data.type_debt_id,
      data.amount,
      new Date(data.created_at)
    );
  }

  async findById(id: number): Promise<VehicleDebt | null> {
    const { data, error } = await this.supabase
      .from("vehicle_debt")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return null;
    }

    return new VehicleDebt(
      data.id,
      data.vehicle_id,
      data.type_debt_id,
      data.amount,
      new Date(data.created_at)
    );
  }

  async findByVehicleId(vehicleId: number): Promise<VehicleDebt[]> {
    const { data, error } = await this.supabase
      .from("vehicle_debt")
      .select("*")
      .eq("vehicle_id", vehicleId);

    if (error) {
      throw new Error(error.message);
    }

    return data.map(item => new VehicleDebt(
      item.id,
      item.vehicle_id,
      item.type_debt_id,
      item.amount,
      new Date(item.created_at)
    ));
  }

  async findAll(): Promise<VehicleDebt[]> {
    const { data, error } = await this.supabase
      .from("vehicle_debt")
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data.map(item => new VehicleDebt(
      item.id,
      item.vehicle_id,
      item.type_debt_id,
      item.amount,
      new Date(item.created_at)
    ));
  }

  async update(id: number, vehicleDebt: Partial<VehicleDebt>): Promise<VehicleDebt | null> {
    const { data, error } = await this.supabase
      .from("vehicle_debt")
      .update(vehicleDebt)
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return null;
    }

    return new VehicleDebt(
      data.id,
      data.vehicle_id,
      data.type_debt_id,
      data.amount,
      new Date(data.created_at)
    );
  }

  async delete(id: number): Promise<boolean> {
    const { error } = await this.supabase
      .from("vehicle_debt")
      .delete()
      .eq("id", id);

    return !error;
  }
}

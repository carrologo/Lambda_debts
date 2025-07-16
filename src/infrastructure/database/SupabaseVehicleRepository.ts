import { createClient } from "@supabase/supabase-js";
import { Vehicle } from "../../domain/entities/Vehicle";
import { VehicleRepository } from "../../domain/repositories/VehicleRepository";

export class SupabaseVehicleRepository implements VehicleRepository {
  private supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_KEY || ""
  );

  async save(vehicle: Vehicle): Promise<Vehicle> {
    const { data, error } = await this.supabase
      .from("vehicle")
      .insert({
        type: vehicle.type,
        brand: vehicle.brand,
        line: vehicle.line,
        version: vehicle.version,
        transmission: vehicle.transmission,
        traction: vehicle.traction,
        fuel_type: vehicle.fuel_type,
        kms: vehicle.kms,
        model: vehicle.model,
        displacement: vehicle.displacement,
        seat_material: vehicle.seat_material,
        airbags: vehicle.airbags,
        url_images: vehicle.url_images,
        plate: vehicle.plate
      })
      .select()
      .single();

    if (error) {
      console.error("Error inserting vehicle:", error);
      throw new Error(error.message);
    }

    return new Vehicle(
      data.id,
      data.type,
      data.brand,
      data.line,
      data.version,
      data.transmission,
      data.traction,
      data.fuel_type,
      data.kms,
      new Date(data.model),
      data.displacement,
      data.seat_material,
      data.airbags,
      data.url_images,
      data.plate
    );
  }

  async findById(id: number): Promise<Vehicle | null> {
    const { data, error } = await this.supabase
      .from("vehicle")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return null;
    }

    return new Vehicle(
      data.id,
      data.type,
      data.brand,
      data.line,
      data.version,
      data.transmission,
      data.traction,
      data.fuel_type,
      data.kms,
      new Date(data.model),
      data.displacement,
      data.seat_material,
      data.airbags,
      data.url_images,
      data.plate
    );
  }

  async findAll(): Promise<Vehicle[]> {
    const { data, error } = await this.supabase
      .from("vehicle")
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data.map(item => new Vehicle(
      item.id,
      item.type,
      item.brand,
      item.line,
      item.version,
      item.transmission,
      item.traction,
      item.fuel_type,
      item.kms,
      new Date(item.model),
      item.displacement,
      item.seat_material,
      item.airbags,
      item.url_images,
      item.plate
    ));
  }

  async update(id: number, vehicle: Partial<Vehicle>): Promise<Vehicle | null> {
    const { data, error } = await this.supabase
      .from("vehicle")
      .update(vehicle)
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return null;
    }

    return new Vehicle(
      data.id,
      data.type,
      data.brand,
      data.line,
      data.version,
      data.transmission,
      data.traction,
      data.fuel_type,
      data.kms,
      new Date(data.model),
      data.displacement,
      data.seat_material,
      data.airbags,
      data.url_images,
      data.plate
    );
  }

  async delete(id: number): Promise<boolean> {
    const { error } = await this.supabase
      .from("vehicle")
      .delete()
      .eq("id", id);

    return !error;
  }
}

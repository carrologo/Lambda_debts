import { createClient } from "@supabase/supabase-js";
import { TypeDebt } from "../../domain/entities/TypeDebt";
import { TypeDebtRepository } from "../../domain/repositories/TypeDebtRepository";

export class SupabaseTypeDebtRepository implements TypeDebtRepository {
  private supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_KEY || ""
  );

  async findAll(): Promise<TypeDebt[]> {
    const { data, error } = await this.supabase
      .from("type_debt")
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data.map(item => new TypeDebt(item.id, item.name));
  }

  async findById(id: number): Promise<TypeDebt | null> {
    const { data, error } = await this.supabase
      .from("type_debt")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return null;
    }

    return new TypeDebt(data.id, data.name);
  }

  async save(typeDebt: TypeDebt): Promise<TypeDebt> {
    const { data, error } = await this.supabase
      .from("type_debt")
      .insert({ id: typeDebt.id, name: typeDebt.name })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return new TypeDebt(data.id, data.name);
  }

  async update(id: number, typeDebt: Partial<TypeDebt>): Promise<TypeDebt> {
    const { data, error } = await this.supabase
      .from("type_debt")
      .update({ name: typeDebt.name })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      throw new Error(error?.message || "Type debt not found");
    }

    return new TypeDebt(data.id, data.name);
  }

  async delete(id: number): Promise<boolean> {
    const { error } = await this.supabase
      .from("type_debt")
      .delete()
      .eq("id", id);

    return !error;
  }
}

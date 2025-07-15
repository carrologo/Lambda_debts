import { TypeDebt } from "../entities/TypeDebt";

export interface TypeDebtRepository {
  save(typeDebt: TypeDebt): Promise<TypeDebt>;
  findAll(): Promise<TypeDebt[]>;
  findById(id: number): Promise<TypeDebt | null>;
  update(id: number, typeDebt: Partial<TypeDebt>): Promise<TypeDebt>;
  delete(id: number): Promise<boolean>;
}

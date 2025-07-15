export class VehicleDebt {
  constructor(
    public id: number,
    public vehicle_id: number,
    public type_debt_id: number,
    public amount: number,
    public created_at: Date
  ) {}
}

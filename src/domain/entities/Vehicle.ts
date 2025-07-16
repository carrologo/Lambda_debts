export class Vehicle {
  constructor(
    public id: number,
    public type: string,
    public brand: string,
    public line: string,
    public version: string | null,
    public transmission: string | null,
    public traction: string | null,
    public fuel_type: string,
    public kms: number,
    public model: Date,
    public displacement: number | null,
    public seat_material: string | null,
    public airbags: boolean | null,
    public url_images: string | null,
    public plate: string | null
  ) {}
}

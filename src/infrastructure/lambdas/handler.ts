import { APIGatewayProxyHandler } from "aws-lambda";

// Repositorios
import { SupabaseTypeDebtRepository } from "../database/SupabaseTypeDebtRepository";
import { SupabaseVehicleDebtRepository } from "../database/SupabaseVehicleDebtRepository";

// Casos de uso para TypeDebt
import { CreateTypeDebt } from "../../application/use-cases/CreateTypeDebt";
import { GetTypeDebts } from "../../application/use-cases/GetTypeDebts";
import { UpdateTypeDebt } from "../../application/use-cases/UpdateTypeDebt";
import { DeleteTypeDebt } from "../../application/use-cases/DeleteTypeDebt";

// Casos de uso para VehicleDebt
import { CreateVehicleDebt } from "../../application/use-cases/CreateVehicleDebt";
import { GetVehicleDebts } from "../../application/use-cases/GetVehicleDebts";
import { GetVehicleDebtsByVehicleId } from "../../application/use-cases/GetVehicleDebtsByVehicleId";
import { UpdateVehicleDebt } from "../../application/use-cases/UpdateVehicleDebt";
import { DeleteVehicleDebt } from "../../application/use-cases/DeleteVehicleDebt";

// Instancias de repositorios
const typeDebtRepository = new SupabaseTypeDebtRepository();
const vehicleDebtRepository = new SupabaseVehicleDebtRepository();

// Instancias de casos de uso para TypeDebt
const createTypeDebt = new CreateTypeDebt(typeDebtRepository);
const getTypeDebts = new GetTypeDebts(typeDebtRepository);
const updateTypeDebt = new UpdateTypeDebt(typeDebtRepository);
const deleteTypeDebt = new DeleteTypeDebt(typeDebtRepository);

// Instancias de casos de uso para VehicleDebt
const createVehicleDebt = new CreateVehicleDebt(vehicleDebtRepository);
const getVehicleDebts = new GetVehicleDebts(vehicleDebtRepository);
const getVehicleDebtsByVehicleId = new GetVehicleDebtsByVehicleId(
  vehicleDebtRepository
);
const updateVehicleDebt = new UpdateVehicleDebt(vehicleDebtRepository);
const deleteVehicleDebt = new DeleteVehicleDebt(vehicleDebtRepository);

export const handler: APIGatewayProxyHandler = async (event) => {
  const { httpMethod, path } = event;

  try {
    // Rutas para TypeDebt
    if (path === "/type-debts") {
      if (httpMethod === "GET") {
        const typeDebts = await getTypeDebts.execute();
        return {
          statusCode: 200,
          body: JSON.stringify(typeDebts),
        };
      }

      if (httpMethod === "POST") {
        const body = JSON.parse(event.body || "{}");
        const { id, name } = body;

        if (!id || !name) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "ID and name are required" }),
          };
        }

        const typeDebt = await createTypeDebt.execute(id, name);
        return {
          statusCode: 201,
          body: JSON.stringify(typeDebt),
        };
      }
    }

    // Ruta para actualizar TypeDebt
    if (path.startsWith("/type-debts/") && httpMethod === "PUT") {
      const id = parseInt(path.split("/")[2]);
      const body = JSON.parse(event.body || "{}");
      const { name } = body;

      if (!name) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Name is required" }),
        };
      }

      const typeDebt = await updateTypeDebt.execute(id, name);
      return {
        statusCode: 200,
        body: JSON.stringify(typeDebt),
      };
    }

    // Ruta para eliminar TypeDebt
    if (path.startsWith("/type-debts/") && httpMethod === "DELETE") {
      const id = parseInt(path.split("/")[2]);
      const success = await deleteTypeDebt.execute(id);

      return {
        statusCode: success ? 200 : 404,
        body: JSON.stringify({
          message: success ? "Type debt deleted" : "Type debt not found",
        }),
      };
    }

    // Rutas para VehicleDebt
    if (path === "/vehicle-debts") {
      if (httpMethod === "GET") {
        const vehicleDebts = await getVehicleDebts.execute();
        return {
          statusCode: 200,
          body: JSON.stringify(vehicleDebts),
        };
      }

      if (httpMethod === "POST") {
        const body = JSON.parse(event.body || "{}");
        const { vehicle_id, type_debt_id, amount} = body;

        if (!vehicle_id || !type_debt_id || !amount) {
          return {
            statusCode: 400,
            body: JSON.stringify({
              message:
                "vehicle_id, type_debt_id, amount, and due_date are required",
            }),
          };
        }

        const vehicleDebt = await createVehicleDebt.execute({
          vehicle_id,
          type_debt_id,
          amount,
        });

        return {
          statusCode: 201,
          body: JSON.stringify(vehicleDebt),
        };
      }
    }

    // Ruta para obtener deudas por vehicle_id
    if (
      path.startsWith("/vehicles/") &&
      path.endsWith("/debts") &&
      httpMethod === "GET"
    ) {
      const vehicleId = parseInt(path.split("/")[2]);
      const vehicleDebts = await getVehicleDebtsByVehicleId.execute(vehicleId);
      return {
        statusCode: 200,
        body: JSON.stringify(vehicleDebts),
      };
    }

    // Ruta para actualizar VehicleDebt
    if (path.startsWith("/vehicle-debts/") && httpMethod === "PUT") {
      const id = parseInt(path.split("/")[2]);
      const body = JSON.parse(event.body || "{}");

      const vehicleDebt = await updateVehicleDebt.execute(id, body);
      return {
        statusCode: 200,
        body: JSON.stringify(vehicleDebt),
      };
    }

    // Ruta para eliminar VehicleDebt
    if (path.startsWith("/vehicle-debts/") && httpMethod === "DELETE") {
      const id = parseInt(path.split("/")[2]);
      const success = await deleteVehicleDebt.execute(id);

      return {
        statusCode: success ? 200 : 404,
        body: JSON.stringify({
          message: success ? "Vehicle debt deleted" : "Vehicle debt not found",
        }),
      };
    }

    // Ruta no encontrada
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Route not found" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      }),
    };
  }
};

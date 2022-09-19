import { db } from "../config";
import { Model, DataTypes, InferAttributes, InferCreationAttributes, } from "sequelize";

interface Movimiento extends Model< InferAttributes<Movimiento>, InferCreationAttributes<Movimiento>> {
	idMovimiento: number;
	cantidad: number;
	tipo: string;
	observacion: string;
	precio: number;
	producto: string;
	total?: number;
}

export const MovimientoModel = db.define<Movimiento>(
	"movimientos",
	{
		idMovimiento: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		cantidad: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		tipo: {
			type: DataTypes.STRING,
			allowNull: false,
			values: ["Entrada", "Salida"],
		},
		precio: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		producto: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		total: {
			type: DataTypes.DOUBLE,
		},
		observacion: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: "Ninguna"
		},
	},
	{
		hooks: {
			beforeCreate: async (movement) => {
				movement.total = movement.precio * movement.cantidad;
			},
		},
	}
);

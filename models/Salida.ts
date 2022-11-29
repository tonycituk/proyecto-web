import { db } from "../config";
import { Model, DataTypes, InferAttributes, InferCreationAttributes, } from "sequelize";

interface Salida extends Model<InferAttributes<Salida>, InferCreationAttributes<Salida>> {
	id?: number;
	almacenista: string;
	responsable: string;
	conformidad: string;
	fecha: string;
}

export const SalidaModel = db.define<Salida>(
	"salidas",
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		almacenista: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		responsable: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		conformidad: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		fecha: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		hooks: {},
	}
);

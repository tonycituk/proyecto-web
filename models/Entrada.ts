import { db } from "../config";
import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";

interface Entrada extends Model<InferAttributes<Entrada>, InferCreationAttributes<Entrada>> {
	id?: number;
	almacenista: string;
	director: string;
	elaborador: string;
	factura: string;
	fecha: string;
	procedencia: string;
	tipo: string;
}

export const EntradaModel = db.define<Entrada>(
	"entradas",
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
		director: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		elaborador: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		factura: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		fecha: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		procedencia: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		tipo: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		hooks: {},
	}
);

import { db } from "../config";
import { Model, DataTypes, InferAttributes, InferCreationAttributes, } from "sequelize";

export interface Producto extends Model<InferAttributes<Producto>, InferCreationAttributes<Producto>> {
	cantidad: number;
	clave: string;
	nombre: string;
	partida: string;
	unidad: string;
}

export const ProductoModel = db.define<Producto>(
	"producto",
	{
		cantidad: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		clave: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		partida: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		unidad: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		hooks: {},
	}
);

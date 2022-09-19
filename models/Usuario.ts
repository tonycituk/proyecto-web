import bcrypt from "bcrypt";
import { db } from "../config";
import { Model, DataTypes, InferAttributes, InferCreationAttributes, } from "sequelize";

interface Usuario extends Model<InferAttributes<Usuario>, InferCreationAttributes<Usuario>> {
	id?: string;
	name: string;
	email: string;
	password: string;
	token: string;
	confirmed: boolean;
	checkPassword: (password: string) => boolean;
}

export const UsuarioModel = db.define<Usuario>(
	"usuarios",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		token: {
			type: DataTypes.STRING,
		},
		confirmed: {
			type: DataTypes.BOOLEAN,
		},
	},
	{
		hooks: {
			beforeCreate: async (user) => {
				user.email = user.email.toLowerCase();
				user.password = await bcrypt.hash(
					user.password,
					await bcrypt.genSalt(10)
				);
			},
		},
	}
);

UsuarioModel.prototype.checkPassword = function (password: string) {
	return bcrypt.compareSync(password, this.password);
};

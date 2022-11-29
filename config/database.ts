import dotenv from "dotenv";
import mysql2 from "mysql2";
import { Sequelize } from "sequelize";

dotenv.config();

export const db = new Sequelize(
	"cecati",
	process.env.DB_USER!,
	process.env.DB_PASSWORD!,
	{	
		dialect: "mysql",
		dialectModule: mysql2,
		host: process.env.DB_HOST!,
		port: Number(process.env.DB_PORT),
		define: {
			timestamps: true,
		},
		pool: {
			min: 0,
			max: 5, // Máximo 5 conexiones por usuario.
			idle: 10000, // 10 segundos antes de que se finalice la conexión sin utilizar.
			acquire: 30000, // 30 segundos tratando de elaborar una conexión antes de marcar error.
		},
	}
);
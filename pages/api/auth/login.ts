import { check, validationResult } from "express-validator";
import type { NextApiRequest, NextApiResponse } from "next";

import { generateJWT } from "../../../utils";
import { UsuarioModel } from "../../../models";
import { db } from "../../../config";

type Data = { _jwt: string } | { validations: [{ msg: string }] } | { validations: [] };

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
	switch (req.method) {
		case "POST":
			return handleLogin(req, res);

		default:
			return res.status(400).json({
				validations: [{ msg: "Método HTTP inválido." }],
			});
	}
}

const handleLogin = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	
	const { email, password } = req.body;

	await check("email").isString().notEmpty().withMessage("El campo de email es obligatorio.").isEmail().withMessage("El email ingresado no es valido.").run(req);
	await check("password").notEmpty().withMessage("El campo de contraseña es obligatorio.").run(req);

	if (validationResult(req).array().length > 0) {
		return res.status(400).json({
			validations: validationResult(req).array() as [],
		});
	}

	if (process.env.NODE_ENV == "development") {
        await db.sync();
    }

	try {
		const user = await UsuarioModel.findOne({ where: { email } });

		if (!user) {
			return res.status(401).json({
				validations: [{ msg: "El correo registrado no pertenece a ningún usuario." }],
			});
		}

		if (!user.confirmed) {
			return res.status(401).json({
				validations: [{ msg: "Esta cuenta no ha sido confirmada. Por favor finalice el proceso de registro." }],
			});
		}

		if (!user.checkPassword(password)) {
			return res.status(401).json({
				validations: [{ msg: "Acceso incorrecto, por favor verifique sus datos." }],
			});
		}

		return res.status(201).json({ _jwt: generateJWT({ id: user.id! }) });
	} catch (error) {
		console.log(`¡Oh no! Ocurrió un error mientras obteniamos la información de la base de datos. ${error}`);
	}
};

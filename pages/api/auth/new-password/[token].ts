import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import type { NextApiRequest, NextApiResponse } from "next";

import { UsuarioModel } from "../../../../models";

type Data = { msg: string } | { validations: [{ msg: string }] } | { validations: [] };

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
	switch (req.method) {
		case "POST":
			return handleNewPassword(req, res);

		default:
			return res.status(400).json({
				validations: [{ msg: "Método HTTP inválido." }],
			});
	}
}

const handleNewPassword = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { token } = req.query;
	const { password } = req.body;

	const user = await UsuarioModel.findOne({ where: { token } });

	await check("password").isLength({ min: 6 }).withMessage("La contraseña debe incluir al menos 6 carácteres.").run(req);
	await check("verification").equals(password).withMessage("Las contraseñas ingresadas no coinciden.").run(req);

    if (validationResult(req).array().length > 0) {
		return res.status(400).json({
			validations: validationResult(req).array() as [],
		});
	}

    if (user) {
		user.password = await bcrypt.hash(password, await bcrypt.genSalt(10));
		user.token = "";
	
		await user.save();
	} else {
		return res.status(401).json({
			validations: [{ msg: "Ocurrió un error mientras validabamos tu información. Por favor reinicia el proceso de cambio de contraseña." }],
		});
	}

	return res.status(200).json({
		msg: "Hemos validado tu información correctamente y tu contraseña ha sido cambiada. Por favor inicia sesión para continuar.",
	});
}
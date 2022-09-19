import { check, validationResult } from "express-validator";
import type { NextApiRequest, NextApiResponse } from "next";

import { UsuarioModel } from "../../../models";
import { generateId, sendEmailResetPassword } from "../../../utils";

type Data = { msg: string } | { validations: [{ msg: string }] } | { validations: [] };

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
	switch (req.method) {
		case "POST":
			return handleNewPasswordRequest(req, res);

		default:
			return res.status(400).json({
				validations: [{ msg: "Método HTTP inválido." }],
			});
	}
}

const handleNewPasswordRequest = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email } = req.body;

	await check("email").isString().notEmpty().withMessage("El campo de email es obligatorio.").isEmail().withMessage("El email ingresado no es valido.").run(req);

	if (validationResult(req).array().length > 0) {
		return res.status(400).json({
			validations: validationResult(req).array() as [],
		});
	}

	const user = await UsuarioModel.findOne({ where: { email } });

	if (!user) {
		return res.status(401).json({
			validations: [{ msg: "El correo registrado no pertenece a ningún usuario." }],
		});
	}

	user.token = generateId();

	await user.save();

	sendEmailResetPassword({
		name: user.name,
		email: user.email,
		token: user.token,
	});

	return res.status(200).json({ msg: "¡Iniciaste el proceso de reestablecimiento de contraseña! Por favor revisa tu correo electronico." })
}
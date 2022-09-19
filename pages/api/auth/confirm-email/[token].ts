import type { NextApiRequest, NextApiResponse } from "next";

import { UsuarioModel } from "../../../../models";

type Data = { msg: string } | { validations: [{ msg: string }] } | { validations: [] };

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
	switch (req.method) {
		case "GET":
			return handleConfirmEmail(req, res);

		default:
			return res.status(400).json({
				validations: [{ msg: "Método HTTP inválido." }],
			});
	}
}

const handleConfirmEmail = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { token } = req.query;

    const user = await UsuarioModel.findOne({ where: { token } });

	if (user) {
		res.status(200).json({
			msg: "Hemos confirmado tu cuenta. Por favor inicia sesión para continuar.",
		});
	} else {
		return res.status(400).json({
			validations: [{ msg: "Hubo un error mientras confirmabamos tu cuenta. Por favor reinicia el proceso de registro." }],
		});
	}

	user.token = "";
	user.confirmed = true;

	await user.save();
}
import type { NextApiRequest, NextApiResponse } from "next";

import { UsuarioModel } from "../../../models";
import { validateJWT, generateJWT } from "../../../utils";

type Data = { _jwt: string } | { validations: [{ msg: string }] };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "POST":
			return validateToken(req, res);
	
		default:
			return res.status(400).json({
                validations: [{ msg: "Método HTTP no válido." }] 
            });
	}
}

const validateToken = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

	const { _jwt = "" } = req.cookies || req.body;

	try {

        const { id }  = validateJWT(_jwt);

        const user = await UsuarioModel.findOne({ where: { id } });

        if (!user) {
            return res.status(401).json({
                validations: [{ msg: "El token de autorización ha expirado o es inválido." }] 
            });
        }

		return res.status(201).json({ _jwt: generateJWT({ id: user.id! }) });

    } catch(error) {
        return res.status(401).json({ 
            validations: [{ msg: "El token de autorización ha expirado o es inválido." }] 
        });
    }
}

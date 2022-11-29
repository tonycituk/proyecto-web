import type { NextApiRequest, NextApiResponse } from "next";
import { check, validationResult } from "express-validator";

import { UsuarioModel } from "../../../models";
import { generateId, sendEmailConfirmAccount } from "../../../utils";
import { db } from "../../../config";

type Data = { msg: string } | { validations: [{ msg: string }] } | { validations: [] };

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
	switch (req.method) {
		case "POST":
			return handleRegister(req, res);

		default:
			return res.status(400).json({
				validations: [{ msg: "Método HTTP inválido." }],
			});
	}
}

const handleRegister = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	
    const { name, email, password } = req.body;

    await check("name").isString().notEmpty().withMessage("El campo de nombre es obligatorio.").run(req);
	await check("email").isString().notEmpty().withMessage("El campo de email es obligatorio.").isEmail().withMessage("El email ingresado no es valido.").run(req);
	await check("password").isLength({ min: 6 }).withMessage("La contraseña debe incluir al menos 6 carácteres.").run(req);
	await check("verification").equals(password).withMessage("Las contraseñas ingresadas no coinciden.").run(req);

    if (validationResult(req).array().length > 0) {
		return res.status(400).json({
			validations: validationResult(req).array() as [],
		});
	}

    if (process.env.NODE_ENV == "development") {
        await db.sync();
    }

    try {
        if (await UsuarioModel.findOne({ where: { email } })) {
            return res.status(409).json({
                validations: [{ msg: "El correo registrado está asociado a otro usuario." }],
            });
        }

        const user = await UsuarioModel.create({
            name,
            email,
            password,
            token: generateId(),
            confirmed: false,
        });
    
        sendEmailConfirmAccount({
            name: user.name,
            email: user.email,
            token: user.token,
        });
    
        return res.status(201).json({ msg: "¡Usuario registrado correctamente!" });

	} catch (error) {
		console.log(`¡Oh no! Ocurrió un error mientras obteniamos la información de la base de datos. ${error}`);
	}
}
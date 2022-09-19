import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../config";

type Data = unknown[] | { validations: [{ msg: string }] };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "GET":
			return getAllFacturas(req, res);
	
        default:
            return res.status(400).json({
                validations: [{ msg: "Método HTTP inválido." }],
            });
	}
}

const getAllFacturas = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const [ results ] = await db.query(
            `SELECT factura FROM entradas`
        );

        return res.json(results);
    } catch(error) {
        console.log("Ocurrió un error mientras se obtenía la información.", error)
    }
}
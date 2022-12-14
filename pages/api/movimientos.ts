import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../config";

type Data = unknown[] | { validations: [{ msg: string }] };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "GET":
			return getAllMovimientos(req, res);
	
        default:
            return res.status(400).json({
                validations: [{ msg: "Método HTTP inválido." }],
            });
	}
}

const getAllMovimientos = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
        const [ results ] = await db.query(
            `SELECT * FROM movimientosConProducto`
            );
    
            return res.json(results);
    } catch(error) {
        console.log(`¡Oh no! Ocurrió un error mientras obteniamos la información de la base de datos. ${error}`)
    }
}
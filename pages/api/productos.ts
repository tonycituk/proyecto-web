import { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../config";

type Data = { msg: string } | { validations: [{ msg: string }] };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "GET":
			return getAllProductos(req, res);
	
        default:
            return res.status(400).json({
                validations: [{ msg: "Método HTTP inválido." }],
            });
	}
}

export const getAllProductos = async (req: NextApiRequest, res: NextApiResponse) => {  
    try {
        const [ results ] = await db.query(
        `SELECT 
            IF (COUNT(*) > 1, SUM(total) / productos.cantidad, SUM(precio)) AS precio,
            productos.nombre,
            productos.cantidad,
            productos.clave,
            productos.partida,
            productos.unidad
        FROM movimientos 
        JOIN productos
        ON movimientos.producto = productos.clave
        GROUP BY 
            productos.nombre,
            productos.cantidad, 
            productos.clave, 
            productos.partida, 
            productos.unidad`
        );

        return res.json(results);
    } catch(error) {
        console.log("Ocurrió un error mientras se obtenía la información.", error)
    }
}
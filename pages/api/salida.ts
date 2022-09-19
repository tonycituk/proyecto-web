import { NextApiRequest, NextApiResponse } from "next";

import { IProducto } from "../../interfaces";
import { generateReportFromOutput } from "../../utils";
import { SalidaModel, ProductoModel, MovimientoModel } from "../../models";

type Data = { msg: string } | { validations: [{ msg: string }] } | { validations: [] };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "POST":
			return handleNuevaSalida(req, res);
	
        default:
            return res.status(400).json({
                validations: [{ msg: "Método HTTP inválido." }],
            });
	}
}

export const handleNuevaSalida = async (req: NextApiRequest, res: NextApiResponse) => {

    const { almacenista, responsable, conformidad, fecha, productos } = req.body;

    const salida = await SalidaModel.create({
        almacenista,
        responsable,
        conformidad,
        fecha 
    });

    productos.forEach(({ cantidad, clave, observacion, precio }: IProducto) => {
        (async () => {
            const producto = await ProductoModel.findOne({ where: { clave } });

            if (producto) {
                if (producto.cantidad - cantidad < 0) {
                    return res.status(409).json({
                        validations: [{ msg: `La cantidad solicitada es mayor a la disponible en el producto ${producto.nombre}` }]
                    });
                }

                producto.cantidad -= cantidad;
                await producto.save();
            }

            await MovimientoModel.create({
                idMovimiento: salida.id!,
                cantidad,
                tipo: "Salida",
                observacion: observacion || "Ninguna", 
                precio: precio * -1,
                producto: clave
            });
        })();
    });

    generateReportFromOutput({ id: salida.id!, almacenista, responsable, conformidad, fecha, productos });
    return res.status(201).json({ msg: "Salida registrada correctamente." });
}
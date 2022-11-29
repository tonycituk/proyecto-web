import type { NextApiRequest, NextApiResponse } from "next";

import { IProducto } from "../../interfaces";
import { generateReportFromEntrie } from "../../utils";
import { EntradaModel, ProductoModel, MovimientoModel } from "../../models";

type Data = { msg: string } | { validations: [{ msg: string }] } | { validations: [] };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "POST":
			return handleNuevaEntrada(req, res);
	
        default:
            return res.status(400).json({
                validations: [{ msg: "Método HTTP inválido." }],
            });
	}
}

const handleNuevaEntrada = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { almacenista, director, elaborador, factura, fecha, procedencia, productos, tipo } = req.body;

    const validation = await EntradaModel.findOne({ where: { factura } });

    if (validation) {
        return res.status(409).json({
			validations: [{ msg: "Ya existe una factura generada con el mismo identificador." }],
		});
    }

    const entrada = await EntradaModel.create({
        almacenista,
        director,
        elaborador, 
        factura, 
        fecha, 
        procedencia,
        tipo
    });

    productos.forEach(({ cantidad, clave, nombre, observacion, partida, precio, unidad }: IProducto) => {
        (async () => {
            const producto = await ProductoModel.findOne({ where: { clave } });

            if (producto) {
                producto.cantidad += cantidad;
                await producto.save();
            } else {
                await ProductoModel.create({
                    cantidad,
                    clave,
                    nombre, 
                    partida,
                    unidad
                });
            }
            
            await MovimientoModel.create({
                idMovimiento: entrada.id!,
                cantidad,
                tipo: "Entrada",
                observacion: observacion || "Ninguna", 
                precio,
                producto: clave
            });
        })();
    });

    generateReportFromEntrie({ id: entrada.id!, almacenista, director, elaborador, factura, fecha, procedencia, productos, tipo });
    return res.status(201).json({ msg: "Entrada registrada correctamente." });
}

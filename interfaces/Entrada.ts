import { IProducto } from "./Producto";

export interface IEntrada {
    almacenista: string;
    director: string;
    elaborador: string;
    factura: string;
    fecha: string;
    procedencia: string;
    productos: IProducto[];
    tipo: string; 
};
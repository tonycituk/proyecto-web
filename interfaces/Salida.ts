import { IProducto } from "./Producto";

export interface ISalida {
    almacenista: string;
    conformidad: string;
    fecha: string;
    productos: IProducto[];
    responsable: string;
};

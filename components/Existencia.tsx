import { IProducto } from "../interfaces"

interface Props {
    producto: IProducto
}

export function Existencia({producto}: Props) {

    const { cantidad, clave, nombre, partida, precio, unidad } = producto;

    return (
        <div className="drop-shadow-xl mx-auto my-8 rounded-md bg-blanco w-11/12 md:w-[760px] h-auto border-slate-700 px-4 md:px-8 py-8">
            <ul>
                <li className="flex items-center">
                    <p className="uppercase font-bold mr-[7px] my-[13px] text-lg"> Nombre del articulo: </p>
                    <p className="text-lg">{nombre}</p>
                </li>
                <li className="flex items-center">
                    <p className="uppercase font-bold mr-[7px] my-[13px] text-lg"> Numero de partida: </p>
                    <p className="text-lg">{partida}</p>
                </li>
                <li className="flex items-center">
                    <p className="uppercase font-bold mr-[7px] my-[13px] text-lg"> Clave del articulo: </p>
                    <p className="text-lg">{clave}</p>
                </li>
                <li className="flex items-center">
                    <p className="uppercase font-bold mr-[7px] my-[13px] text-lg"> Tipo de unidad: </p>
                    <p className="text-lg">{unidad}</p>
                </li>
                <li className="flex items-center">
                    <p className="uppercase font-bold mr-[7px] my-[13px] text-lg"> Cantidad de artículos: </p>
                    <p className="text-lg">{cantidad}</p>
                </li>
                <li className="flex items-center">
                    <p className="uppercase font-bold mr-[7px] my-[13px] text-lg"> Precio promedio: </p>
                    <p className="text-lg">{`$${precio?.toFixed(2) || 0}`}</p>
                </li>
            </ul>
        </div>
    )
}

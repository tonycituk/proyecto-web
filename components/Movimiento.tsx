import { IMovimiento } from "../interfaces"
import { generateDate } from "../utils/generateDate";

interface Props {
    movimiento: IMovimiento;
}

export function Movimiento({ movimiento }: Props) {

    const { cantidad, fecha, observacion, partida, precio, producto, tipo, unidad } = movimiento;

    return (
        <div className="h-auto mx-auto my-8 rounded-md bg-[white] drop-shadow-xl w-11/12 md:w-[760px]">
            <ul className="pl-[30px] pt-[1rem]">
                <li className="flex flex-wrap items-center">
                    <p className="uppercase font-bold pr-[7px] py-[13px] text-lg">Nombre del articulo:</p>
                    <p className="text-lg">{producto}</p>
                </li>
                <li className="flex flex-wrap items-center">
                    <p className="uppercase font-bold pr-[7px] py-[13px] text-lg">Partida del articulo:</p>
                    <p className="text-lg">{partida}</p>
                </li>
                <li className="flex flex-wrap items-center">
                    <p className="uppercase font-bold pr-[7px] py-[13px] text-lg">Tipo de unidad:</p>
                    <p className="text-lg">{unidad}</p>
                </li>
                <li className="flex flex-wrap items-center">
                    <p className="uppercase font-bold pr-[7px] py-[13px] text-lg">Fecha del movimiento:</p>
                    <p className="text-lg">{generateDate(fecha)}</p>
                </li>
                <li className="flex flex-wrap items-center">
                    <p className="uppercase font-bold pr-[7px] py-[13px] text-lg">{tipo === "Entrada" ? "Cantidad entrada: " : "Cantidad salida: "}</p>
                    <p className="text-lg">{cantidad}</p>
                </li>
                <li className="flex flex-wrap items-center">
                    <p className="uppercase font-bold pr-[7px] py-[13px] text-lg">Precio del articulo:</p>
                    <p className={`text-lg ${tipo === "Salida" && "text-rojo"}`}>{tipo === "Salida" ? `$${(precio * -1).toFixed(2)}`: `$${precio.toFixed(2)}`}</p>
                </li>
                <li className="flex flex-wrap items-center">
                    <p className="uppercase font-bold pr-[7px] py-[13px] text-lg">Observaciones:</p>
                    <p className="text-lg">{observacion}</p>
                </li>
            </ul>
            <div className="flex flex-wrap mt-[1.5rem] pb-5 mx-[2rem] justify-between items-center">
                <p className="text-rojo font-bold uppercase text-lg">{tipo}</p>
            </div>
        </div>
    )
}

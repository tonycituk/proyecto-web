import Link from "next/link";
import { IProducto } from "../interfaces"

interface Props {
    producto: IProducto;
}

export function Producto({ producto }: Props) {

    const { nombre, clave, partida, unidad } = producto;

    return (
        <div className="drop-shadow-xl mx-auto my-8 rounded-md bg-blanco w-11/12 md:w-[760px] h-auto border-slate-700 px-4 md:px-8 py-6">
            <ul>
                <li className="flex flex-wrap items-center">
                    <p className="uppercase font-bold pr-[7px] py-[13px] text-lg">Nombre del articulo:</p>
                    <p className="text-lg">{nombre}</p>
                </li>
                <li className="flex flex-wrap items-center">
                    <p className="uppercase font-bold pr-[7px] py-[13px] text-lg">Clave del articulo:</p>
                    <p className="text-lg">{clave}</p>
                </li>
                <li className="flex flex-wrap items-center">
                    <p className="uppercase font-bold pr-[7px] py-[13px] text-lg">Partida del articulo:</p>
                    <p className="text-lg">{partida}</p>
                </li>
                <li className="flex flex-wrap items-center">
                    <p className="uppercase font-bold pr-[7px] py-[13px] text-lg">Tipo de unidad:</p>
                    <p className="text-lg">{unidad}</p>
                </li>
            </ul>
            <div className="md:flex mx-auto md:justify-end mt-5 md:mt-[10px]">
                <Link href="/tempEntrada.xlsx" >
                    <a className="bg-azul w-full md:w-[80px] h-[50px] rounded-[3px]">
                        <svg className="mx-auto" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round" > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" /> <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" /> <rect x="7" y="13" width="10" height="8" rx="2" /> </svg>
                    </a>
                </Link>
			</div>
        </div>
    )
}

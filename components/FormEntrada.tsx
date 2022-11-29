import { FormEvent } from 'react';
import { UseFormRegister } from "react-hook-form";

import { IEntrada } from "../interfaces";

interface Props {
    register: UseFormRegister<IEntrada>;
	renderFormProductosHandler: (e: FormEvent) => void;
}

export function FormEntrada({ register, renderFormProductosHandler }: Props) {
	return (
		<div className="drop-shadow-xl mx-auto my-8 rounded-md bg-blanco w-11/12 md:w-[760px] h-auto border-slate-700 px-4 md:px-8 py-5">
			<div className="md:grid md:grid-cols-2 items-center md:gap-x-6">
				<div className="flex flex-col md:col-start-1 md:col-end-3 my-[10px]">
					<label htmlFor="procedencia" className="p-2 font-bold text-lg">
						TIENDA DE PROCEDENCIA
					</label>
					<input
						type="text"
						id="procedencia"
                        {...register("procedencia")}
						placeholder="Digite la tienda de procedencia"
						className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
					/>
				</div>
				<div className="flex flex-col my-[10px]">
					<label htmlFor="factura" className="p-2 font-bold text-lg">
						NO. DE FACTURA
					</label>
					<input
						type="text"
						list="factura"
                        {...register("factura")}
						placeholder="Digite el número de factura"
						className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
					/>
				</div>
				<div className="flex flex-col my-[10px]">
					<label htmlFor="fecha" className="p-2 font-bold text-lg">
						FECHA
					</label>
					<input
						type="date"
						id="fecha"
                        {...register("fecha")}
						className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
					/>
				</div>
				<div className="flex flex-col my-[10px]">
					<label htmlFor="tipo" className="p-2 font-bold text-lg">
						TIPO DE PROCEDENCIA
					</label>
					<input
						type="text"
                        list="tipo"
                        {...register("tipo")}
						placeholder="Digite el tipo de procedencia"
						className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
					/>
                    <datalist id="tipo">
                        <option>CD</option>
                    </datalist>
				</div>
				<div className="flex flex-col my-[10px]">
					<label htmlFor="director" className="p-2 font-bold text-lg">
						DIRECTOR DEL PLANTEL
					</label>
					<input
						type="text"
						id="director"
                        {...register("director")}
						placeholder="Digite el nombre del director del plantel"
						className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
					/>
				</div>
				<div className="flex flex-col my-[10px]">
					<label htmlFor="elaborador" className="p-2 font-bold text-lg">
						NOMBRE DEL ELABORADOR
					</label>
					<input
						type="text"
						id="elaborador"
                        {...register("elaborador")}
						placeholder="Digite el nombre de la persona que elabora"
						className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
					/>
				</div>
				<div className="flex flex-col my-[10px]">
					<label htmlFor="almacenista" className="p-2 font-bold text-lg">
						NOMBRE DEL ALMACENISTA
					</label>
					<input
						type="text"
						id="almacenista"
                        {...register("almacenista")}
						placeholder="Digite el nombre del almacenista"
						className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
					/>
				</div>
				<div className="flex flex-col md:col-start-1 md:col-end-3 mt-5">
					<button
						onClick={renderFormProductosHandler} 
						className="font-bold bg-rojo text-lg text-blanco h-[61px] w-full"
					>
						CONTINUAR
					</button>
				</div>
			</div>
		</div>
	);
}

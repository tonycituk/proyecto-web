import { FormEvent } from "react";
import { UseFormRegister } from "react-hook-form";

import { ISalida } from "../interfaces";

interface Props {
    register: UseFormRegister<ISalida>;
	renderFormProductosHandler: (e: FormEvent) => void;
}

const personal = [
    {
        id: 1,
		nombre: "Alicia Jimenez Mendoza",
    },
    {
		id: 2,
		nombre: "Angel García",
    },
    {
        id: 3,
		nombre: "Antonio Espinosa Correa",
    },
    {
        id: 4,
		nombre: "Antonio Montero Morales",
    },
    {
        id: 5,
		nombre: "Avenamar Rodriguez",
    },
    {
		id: 6,
		nombre: "Carlos Aurelio Lopez Echavarria",
    },
    {
		id: 7,
		nombre: "Carmen Beatriz Uc Padilla",
    },
    {
        id: 8,
		nombre: "Citlalith Pacheco Gomez",
    },
    {
        id: 9,
		nombre: "Daniel A. Benitez",
    },
    {
		id: 10,
		nombre: "Evelio Sanchez Martinez",
    },
    {
		id: 11,
		nombre: "Francisco Gabriel Pech Pech",
    },
    {
		id: 12,
		nombre: "Francisco Moises Campos R.",
    },
    {
        id: 13,
		nombre: "Jesus Alberto Calderón García",
    },
    {
		id: 14,
		nombre: "Jose Adrian Gomez Gongora",
    },
    {
		id: 15,
		nombre: "Jose Manuel Acate Almeida",
    },
    {
		id: 16,
		nombre: "Luisa Gabriela Linares Perez",
    },
    {
		id: 17,
		nombre: "Luz María Peralta Castellones",
    },
    {
        id: 18,
		nombre: "María de los Angeles Culebro",
    },
    {
        id: 19,
		nombre: "María E. Gutierrez Gomez",
    },
    {
		id: 20,
		nombre: "Ramon Sarricolea",
    },
    {
        id: 21,
		nombre: "Sergio Jesús Gomez Gongora",
    },
    {
		id: 22,
		nombre: "Tila del Carmen Mendoza Olan",
    },
    {
		id: 23,
		nombre: "Viky Villegas",
    }
]; // TODO: Terminar de llenar

export function FormSalida({ register, renderFormProductosHandler }: Props) {
	return (
		<div className="drop-shadow-xl mx-auto my-8 rounded-md bg-blanco w-11/12 md:w-[760px] h-auto border-slate-700 px-4 md:px-8 py-5">
			<div className="md:grid md:grid-cols-2 items-center md:gap-x-6">
                <div className="flex flex-col my-[10px]">
					<label htmlFor="responsable" className="p-2 font-bold text-lg">
						AREA SOLICITANTE
					</label>
					<select
						id="responsable"
                        {...register("responsable")}
						placeholder="Seleccione el área solicitante"
						className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
					>
                        {/* TODO: Colocar el nombre del responsable del área */}
                        <option value="" hidden>Seleccione el área solicitante</option>
						<option value="Jesus Alberto Calderón García">Capacitación</option>
						<option value="...">Servicios administrativos</option>
						<option value="Luz María Peralta Castellanos">Vinculación</option>
						<option value="Ruben Benitez Gonzalez">Dirección</option>
                    </select>
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
				<div className="flex flex-col my-[10px]">
					<label htmlFor="conformidad" className="p-2 font-bold text-lg">
						FIRMA DE CONFORMIDAD
					</label>
					<select
						id="conformidad"
                        {...register("conformidad")}
						className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
					>
                        <option hidden>Seleccione el nombre de la persona que firma de conformidad</option>
                        {personal.map(({id, nombre}) => <option key={id} value={nombre}>{nombre}</option>)}
                    </select>
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

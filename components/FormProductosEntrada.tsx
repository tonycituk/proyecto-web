import { IEntrada, IPartida } from "../interfaces";
import { UseFormRegister } from "react-hook-form";

interface Props {
	index: number;
	partidas: IPartida[];
	register: UseFormRegister<IEntrada>;
}

export function FormProductosEntrada({ index, partidas, register }: Props) {
	return (
		<div className="drop-shadow-xl mx-auto my-8 rounded-md bg-blanco w-11/12 md:w-[760px] h-auto border-slate-700 px-4 md:px-8 py-8">
			<div className="md:grid md:grid-cols-2 items-center md:gap-x-6">
				<div className="flex flex-col md:col-start-1 md:col-end-3 my-[10px]">
					<label className="p-2 font-bold text-lg">PARTIDA</label>
					<select
						title="partida"
						{...register(`productos.${index}.partida`)}
						className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
					>
						<option hidden>Seleccione o digite la partida del artículo</option>
						{partidas.map(({ id, partida }) => (
							<option key={id} value={partida}>
								{partida}
							</option>
						))}
					</select>
				</div>
				<div className="flex flex-col md:col-start-1 md:col-end-3 my-[10px]">
					<label className="p-2 font-bold text-lg">NOMBRE DEL ARTICULO</label>
					<input
						type="text"
						{...register(`productos.${index}.nombre`)}
						placeholder="Describa el artículo al que dará entrada"
						className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
					/>
				</div>
				<div className="flex flex-col md:col-start-1 md:col-end-3 my-[10px]">
					<label className="p-2 font-bold text-lg">CLAVE DEL ARTICULO</label>
					<input
						type="text"
						{...register(`productos.${index}.clave`)}
						placeholder="Digite la clave del articulo"
						className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
					/>
				</div>
				<div className="flex flex-col md:col-start-1 md:col-end-3 my-[10px]">
					<label className="p-2 font-bold text-lg">TIPO DE UNIDAD</label>
					<select
						title="unidad"
						{...register(`productos.${index}.unidad`)}
						className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
					>
						<option hidden>Seleccione el tipo de unidad</option>
						<option value={"Caja"}>Caja</option>
						<option value={"Cubeta"}>Cubeta</option>
						<option value={"Galon"}>Galon</option>
						<option value={"Kilogramo"}>Kilogramo</option>
						<option value={"Litro"}>Litro</option>
						<option value={"Metro"}>Metro</option>
						<option value={"Mililitro"}>Mililitro</option>
						<option value={"Pieza"}>Pieza</option>
					</select>
				</div>
				<div className="flex flex-col my-[10px]">
					<label className="p-2 font-bold text-lg">CANTIDAD DE ARTICULOS</label>
					<input
						min={0}
                        type="number"
						{...register(`productos.${index}.cantidad`, { valueAsNumber: true, })}
						placeholder="Digite la cantidad de articulos"
						className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
					/>
				</div>
				<div className="flex flex-col my-[10px]">
					<label className="p-2 font-bold text-lg">PRECIO UNITARIO</label>
					<input
						min={0}
						step="any"
						type="number"
						{...register(`productos.${index}.precio`, { valueAsNumber: true })}
						placeholder="Digite el precio del artículo"
						className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
					/>
				</div>
				<div className="flex flex-col md:col-start-1 md:col-end-3 my-[10px]">
					<label className="p-2 font-bold text-lg">OBSERVACIONES</label>
					<textarea
						{...register(`productos.${index}.observacion`)}
						placeholder="Digite las observaciones sobre el articulo"
						className="text-texto text-lg py-3 px-5 w-full rounded-[10px] border-2 border-gris resize-none"
					>
                    </textarea>
				</div>
			</div>
		</div>
	);
}

import { ISalida, IProducto } from "../interfaces";
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface Props {
	index: number;
    productos: IProducto[];
	setValue: UseFormSetValue<ISalida>;
	register: UseFormRegister<ISalida>;
}

export function FormProductosSalida({ index, productos, setValue, register }: Props) {
	return (
		<div className="drop-shadow-xl mx-auto my-8 rounded-md bg-blanco w-11/12 md:w-[760px] h-auto border-slate-700 px-4 md:px-8 py-8">
			<div className="md:grid md:grid-cols-2 items-center md:gap-x-6">
				<div className="flex flex-col md:col-start-1 md:col-end-3 my-[10px]">
					<label className="p-2 font-bold text-lg">NOMBRE DEL ARTICULO</label>
					<select
						title="producto"
						{...register(`productos.${index}.nombre`)}
                        className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
                        onChange={(e) => {
                            const producto = productos.find(({ nombre }) => nombre === e.target.value);

                            producto && document.getElementsByName(`productos.${index}.cantidad`)[0].setAttribute("max", String(producto.cantidad));
                            producto && document.getElementsByName(`productos.${index}.disponible`)[0].setAttribute("value", String(producto.cantidad));

							setValue(`productos.${index}.precio`, producto!.precio);
							setValue(`productos.${index}.clave`, producto!.clave);
							setValue(`productos.${index}.partida`, producto!.partida);
							setValue(`productos.${index}.unidad`, producto!.unidad);
                        }}
					>
						<option value="" hidden>Seleccione el nombre del articulo al que dará salida</option>
                        {(() => {
                            const partidas: string[] = [];
                            productos.forEach(({partida}) => !partidas.includes(partida) && partidas.push(partida));

                            return partidas.map((partidaElement) => (
                                <optgroup key={partidaElement} label={partidaElement}>
                                    {productos.map(({nombre, partida}) => partidaElement === partida && (
                                        <option key={nombre} value={nombre}>{nombre}</option>
                                    ))}
                                </optgroup>
                            ));
						})()}
					</select>
				</div>
				<div className="flex flex-col my-[10px]">
					<label className="p-2 font-bold text-lg">CANTIDAD ENTREGADA</label>
					<input
						min={0}
                        type="number"
						{...register(`productos.${index}.cantidad`, { valueAsNumber: true, })}
						placeholder="Digite la cantidad de articulos"
						className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
					/>
				</div>
                <div className="flex flex-col my-[10px]">
					<label className="p-2 font-bold text-lg">CANTIDAD DISPONIBLE</label>
					<input
                        readOnly={true}
                        name={`productos.${index}.disponible`}
						placeholder="Seleccione un articulo para ver la cantidad disponible"
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
				<input
					type="hidden"
					{...register(`productos.${index}.partida`)}
					placeholder="Seleccione un articulo para ver la partida"
					className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
				/>
				<input
					type="hidden"
					{...register(`productos.${index}.clave`)}
					placeholder="Seleccione un articulo para ver su clave"
					className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
				/>
				<input
					type="hidden"
					{...register(`productos.${index}.unidad`)}
					placeholder="Seleccione un articulo para ver la unidad"
					className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
				/>
				<input
					type="hidden"
					{...register(`productos.${index}.precio`, { valueAsNumber: true, })}
					placeholder="Seleccione un articulo para ver el precio promedio"
					className="text-texto text-lg px-5 h-[58px] w-full rounded-[10px] border-2 border-gris"
				/>
			</div>
		</div>
	);
}

import { useState } from "react";
import { GetServerSideProps } from "next";

import { useSearch } from "../hooks";
import { cecatiAPI } from "../services";
import { IProducto } from "../interfaces";
import { generateReportFromStock, validateJWT } from "../utils";
import { Buscador, Error, Existencia, Header, Navegacion } from "../components";

interface Props {
	productos: IProducto[];
}

export default function Existencias({ productos }: Props) {

    const [isWarehouseClean] = useState(productos.length > 0 ? false : true);
    const { handleSearch, arrayFiltered } = useSearch(productos, "nombre");

    const handlePrint = () => {
		const link = document.createElement("a");
		link.style.display = "none";
		link.href = "/tempExistencias.xlsx";

		document.body.appendChild(link);
   		link.click();
    }

	return (
		<>
			<Header title="Consultar existencias" />

            {!isWarehouseClean && (
                <Navegacion>
                    <button
                        type="button"
                        onClick={handlePrint}
                        className="flex text-blanco font-bold md:text-lg items-center"
                    >
                        <p className="pr-4">IMPRIMIR</p>
                        <svg width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round" > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" /> <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" /> <rect x="7" y="13" width="10" height="8" rx="2" /> </svg>
                    </button>
                </Navegacion>
            )}

            {!isWarehouseClean ? 
                <>
                    <h1 className="text-center uppercase text-[27px] font-bold py-8">
				        Tabla de existencias
			        </h1>

                    <Buscador handleSearch={handleSearch} />

                    {arrayFiltered.map((producto, index) => 
                        <Existencia key={`Producto ${index}`} producto={producto} />)}
                </>:

                <Error title="Error" body="No existen productos dentro del inventario." />
            }
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const { _jwt = "" } = req.cookies;
	let isValidToken: boolean;

	try {
		validateJWT(_jwt);
		isValidToken = true;
	} catch (e) {
		isValidToken = false;
	}

	if (!isValidToken) {
		return {
			redirect: {
				destination: "/auth/login",
				permanent: false,
			},
		};
	}

	const { "0": resExistencias } = await Promise.all([
		cecatiAPI.get("/productos"),
	]);

	generateReportFromStock(resExistencias.data);

	return {
		props: {
			productos: resExistencias.data,
		},
	};
};

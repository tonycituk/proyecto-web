import { useState } from "react";
import { GetServerSideProps } from "next";

import { useSearch } from "../hooks";
import { validateJWT } from "../utils";
import { cecatiAPI } from "../services";
import { IMovimiento } from "../interfaces";
import { Buscador, Header, Movimiento, Navegacion } from "../components";

interface Props {
	movimientos: IMovimiento[];
}

export default function Movimientos({ movimientos }: Props) {

    const { handleSearch, arrayFiltered } = useSearch(movimientos, "producto");

	return (
		<>
			<Header title="Consultar movimientos" />

            <Navegacion>
            </Navegacion>

            <h1 className="text-center uppercase text-[27px] font-bold py-8">
                Historial de movimientos
            </h1>

            <Buscador handleSearch={handleSearch} />

            {arrayFiltered.map((movimiento, index) => 
                <Movimiento key={`Movimiento ${index}`} movimiento={movimiento} />)}
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

	const { "0": resMovimientos } = await Promise.all([
		cecatiAPI.get("/movimientos"),
	]);

	return {
		props: {
			movimientos: resMovimientos.data,
		},
	};
};

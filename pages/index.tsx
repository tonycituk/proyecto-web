import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

import { db } from "../config";
import { validateJWT } from "../utils";
import { Header, FloatingButton } from "../components";
import logoPic from '../public/img/logo.png'

export default function Menu () {

	const router = useRouter();

  	return (
		<>
			<Header title="Menu" />

			<div className="md:w-80 mx-auto">
				<header className="container text-center mx-auto md:mt-10">
					<Image
						src={logoPic}
						width={125}
						height={125}
						alt="Logo"
						className="mx-auto mt-5"
					/>
					<h1 className="text-rojo font-bold text-4xl my-7">Menú de inicio</h1>
					<h2 className="font-bold text-xl">¡Bienvenido de vuelta!</h2>
				</header>

				<div className="flex flex-col text-center mt-10 gap-7 text-lg">
					<Link href="/entrada">Entrada de articulos</Link>
					<Link href="/salida">Salida de articulos</Link>
					<Link href="/existencias">Consultar existencias</Link>
					<Link href="/tarjetas">Tarjetas de almacen</Link>
					<Link href="/movimientos">Resumen de movimientos</Link>
					<Link href="/logo">Cambiar Logo</Link>

				</div>
			</div>

			<FloatingButton handler={() => {
				Cookies.remove("_jwt");
				router.push("/auth/login");
			}}>
				<div className="flex justify-end rounded-full bg-rojo p-2.5">
					<svg width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round" > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /> <path d="M7 12h14l-3 -3m0 6l3 -3" /> </svg>
				</div>
			</FloatingButton>
		</>
  	);
}

// Redirecciona si no encuentra o valida el JWT
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	 
	const { _jwt = "" } = req.cookies;
	let isValidToken: boolean;

	try {
		validateJWT(_jwt);
		isValidToken = true;
	} catch(e) {
		isValidToken = false;
	}

	if ( !isValidToken ) {
		return {
			redirect: {
				destination: "/auth/login",
				permanent: false
			}
		}
	}

	return {props: {}}
}
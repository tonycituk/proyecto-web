import Link from "next/link";
import Image from "next/image";
import Cookies from 'js-cookie';
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { useState, FormEvent } from "react";

import { cecatiAPI } from "../../services";
import { useRouter } from "next/router";
import { Header } from "../../components";
import { validateJWT } from "../../utils";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if ([email, password].includes("")) {
			alert("Todos los campos son obligatorios.");
		} else {
			setEmail(email.toLowerCase());

			try {
				const res = await cecatiAPI.post("/auth/login", { email, password });

				const {data: { _jwt }} = res;
				Cookies.set("_jwt", _jwt);
				router.push("/");
				
			} catch(error: (any | AxiosError)) {
				alert(error.response.data.validations[0].msg || "¡Oh no! Ocurrió un error mientras obteniamos la información. Por favor contacte al administrador.");
			}
		}
	};

	return (
		<>
			<Header title="Inicio de sesión" />

			<header className="container text-center mx-auto md:mt-10">
				<Image alt="Logo" src="/img/logo.png" className="mx-auto mt-5" width={125} height={125} />
				<h1 className="text-rojo font-bold text-4xl my-7">Inicio de sesión</h1>
				<h2 className="font-bold text-xl">¡Bienvenido de vuelta!</h2>
			</header>

			<main className="container mt-16 mx-auto xl:w-1/2">
				<form className="flex flex-col mx-5" onSubmit={handleSubmit}>
					<div className="w-full relative">
						<input
							type="email"
							name="email"
							value={email}
							placeholder="Ejemplo@dgcft.sems.gob.mx"
							onChange={(e) => setEmail(e.target.value)}
							className="w-full rounded-xl border-2 border-gris py-3 pl-12 my-3 placeholder-texto"
						/>
						<svg className="absolute left-3 top-2/4 -translate-y-2/4" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#D43031" fill="none" strokeLinecap="round" strokeLinejoin="round" > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <rect x="3" y="5" width="18" height="14" rx="2" /> <polyline points="3 7 12 13 21 7" /> </svg>
					</div>
					<div className="w-full relative">
						<input
							type="password"
							name="password"
							value={password}
							placeholder="Contraseña"
							onChange={(e) => setPassword(e.target.value)}
							className="w-full rounded-xl border-2 border-gris py-3 pl-12 pr-4 my-3 placeholder-texto"
						/>
						<svg className="absolute left-3 top-2/4 -translate-y-2/4" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#D43031" fill="none" strokeLinecap="round" strokeLinejoin="round" > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <circle cx="8" cy="15" r="4" /> <line x1="10.85" y1="12.15" x2="19" y2="4" /> <line x1="18" y1="5" x2="20" y2="7" /> <line x1="15" y1="8" x2="17" y2="10" /> </svg>
					</div>
					<Link href="/auth/forgot-password">
						<a className="text-rojo text-center mt-3 md:text-right">
							¿Olvidaste tu contraseña?
						</a>
					</Link>
					<input
						type="submit"
						value="INICIAR SESIÓN"
						className="rounded-lg p-3 bg-rojo cursor-pointer mt-16 mb-6 text-[white]"
					/>
					<Link href="/auth/register">
						<a className="text-center text-rojo mb-9">Registrar nueva cuenta</a>
					</Link>
				</form>
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	 
	const { _jwt = "" } = req.cookies;
	let isValidToken: boolean;

	try {
		validateJWT(_jwt);
		isValidToken = true;
	} catch(e) {
		isValidToken = false;
	}

	if ( isValidToken ) {
		return {
			redirect: {
				destination: "/",
				permanent: false
			}
		}
	}

	return {props: {}}
}
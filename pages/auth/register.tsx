import Link from "next/link";
import Image from "next/image";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useState, FormEvent } from 'react';

import { cecatiAPI } from "../../services";
import { Header } from "../../components";
import { validateJWT } from "../../utils";

export default function Register() {
	
    const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [verification, setVerification] = useState("");

	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if ([name, email, password, verification].includes("")) {
			alert("Todos los campos son obligatorios.");
		} else {
			setEmail(email.toLowerCase());

			try {
				await cecatiAPI.post("/auth/register", { name, email, password, verification });
				alert("¡Usuario registrado correctamente! Revisa tu correo electronico para continuar el proceso de registro.");
				router.push("/auth/login");

			} catch(error: (any | AxiosError)) {
				alert(error.response.data.validations[0].msg || "¡Oh no! Ocurrió un error mientras guardabamos la información. Por favor contacte al administrador.");
			}
		}
	}
	
	return (
		<>
			<Header title="Registro" />

			<header className="container text-center mx-auto md:mt-8">
				<Image src="/img/logo.png" width={125} height={125} alt="Logo" className="mx-auto mt-5 w-24 md:w-36 md:h-36" />
				<h1 className="text-rojo font-bold text-4xl my-7">Crear cuenta</h1>
			</header>

			<main className="container mt-10 mx-auto xl:w-1/2">
				<form className="flex flex-col mx-5" onSubmit={handleSubmit}>
					<div className="w-full relative">
						<input
							type="text"
							name="name"
                            value={name}
							placeholder="Nombre"
                            onChange={(e) => setName(e.target.value)}
							className="w-full rounded-xl border-2 border-gris py-3 pl-12 my-3 placeholder-texto"
						/>
						<svg className="absolute left-3 top-2/4 -translate-y-2/4" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#D43031" fill="none" strokeLinecap="round" strokeLinejoin="round" > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <circle cx="12" cy="7" r="4" /> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /> </svg>
					</div>
					<div className="w-full relative">
						<input
							type="email"
							name="email"
							value={email}
							placeholder="Correo electrónico"
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
					<div className="w-full relative">
						<input
							type="password"
							name="confirmacion"
                            value={verification}
							placeholder="Confirmar contraseña"
							onChange={(e) => setVerification(e.target.value)}
							className="w-full rounded-xl border-2 border-gris py-3 pl-12 pr-4 my-3 placeholder-texto"
						/>
						<svg className="absolute left-3 top-2/4 -translate-y-2/4" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#D43031" fill="none" strokeLinecap="round" strokeLinejoin="round" > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <circle cx="8" cy="15" r="4" /> <line x1="10.85" y1="12.15" x2="19" y2="4" /> <line x1="18" y1="5" x2="20" y2="7" /> <line x1="15" y1="8" x2="17" y2="10" /> </svg>
					</div>
					<input
						type="submit"
						value="CREAR CUENTA"
						className="rounded-lg p-3 bg-rojo cursor-pointer mt-16 mb-6 text-white"
					/>
					<Link href="/auth/login">
						<a className="text-center mb-9"> ¿Ya tienes una cuenta? <span className="text-rojo">Inicia sesión</span></a>
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
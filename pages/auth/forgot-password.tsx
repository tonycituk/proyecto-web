import Image from 'next/image';
import { AxiosError } from "axios";
import { useRouter } from "next/router"
import { useState, FormEvent } from 'react';

import { cecatiAPI } from "../../services";
import { Header } from "../../components";

export default function ForgotPassword() {

	const [email, setEmail] = useState("");

	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if ([email].includes("")) {
			alert("Todos los campos son obligatorios.");
		} else {

			setEmail(email.toLowerCase());

			try {
				const res = await cecatiAPI.post("/auth/forgot-password", { email });

				alert("¡Iniciaste el proceso de reestablecimiento de contraseña! Por favor revisa tu correo electronico para continuar.");
				router.push("/auth/login"); // Redireccionamos
				
			} catch(error: (any | AxiosError)) {
				alert(error.response.data.validations[0].msg || "¡Oh no! Ocurrió un error mientras obteniamos la información. Por favor contacte al administrador.");
			}
		}
	}

	return (
		<>
			<Header title="Recupera tu contraseña" />

			<header className="container text-center mx-auto md:mt-10">
				<Image alt="Logo" src="/img/logo.png" className="mx-auto mt-5" width={125} height={125} />
				<h1 className="text-rojo font-bold text-4xl my-7">Recupera tu acceso</h1>
				<h2 className="font-bold text-xl">¿Olvidaste tu contraseña?</h2>
			</header>

			<main className="container mt-16 mx-auto xl:w-1/2">
				<form className="flex flex-col mx-5" onSubmit={handleSubmit}>
					<div className="w-full relative">
						<input
							type="email"
							name="email"
                            value={email}
							placeholder="Tu correo electrónico"
							onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border-2 border-gris py-3 pl-12 my-3 placeholder-texto"
						/>
						<svg className="absolute left-3 top-2/4 -translate-y-2/4" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#D43031" fill="none" strokeLinecap="round" strokeLinejoin="round" > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <rect x="3" y="5" width="18" height="14" rx="2" /> <polyline points="3 7 12 13 21 7" /> </svg>
					</div>
					<input
						type="submit"
						className="rounded-lg p-3 bg-rojo cursor-pointer mt-16 mb-6 text-[white]"
						value="RECUPERA TU ACCESO"
					/>
				</form>
			</main>
		</>
	);
}

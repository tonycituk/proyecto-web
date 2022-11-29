import Image from 'next/image';
import { AxiosError } from "axios";
import { useRouter } from "next/router"
import { FormEvent, useState } from 'react';

import { cecatiAPI } from "../../../services";
import { Header } from "../../../components";

export default function NewPassword() {

	const [password, setPassword] = useState("");
	const [verification, setVerification] = useState("");

	const router = useRouter();
	const { token } = router.query;

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if ([password, verification].includes("")) {
			alert("Todos los campos son obligatorios.");
		} else {

			try {
				const res = await cecatiAPI.post(`/auth/new-password/${token}`, {password, verification});

				alert("Hemos validado tu información correctamente y tu contraseña ha sido cambiada. Por favor inicia sesión para continuar.");
				router.push("/auth/login");
				
			} catch(error: (any | AxiosError)) {
				alert(error.response.data.validations[0].msg || "¡Oh no! Ocurrió un error mientras obteniamos la información. Por favor contacte al administrador.");
			}
		}
	}

	return (
		<>
			<Header title="Establece tu nueva contraseña" />

			<header className="container text-center mx-auto md:mt-10">
				<Image alt="Logo" src="/img/logo.png" className="mx-auto mt-5" width={125} height={125} />
				<h1 className="text-rojo font-bold text-4xl my-7">Recupera tu acceso</h1>
				<h2 className="font-bold text-xl">Establece tu nueva contraseña</h2>
			</header>

			<main className="container mt-16 mx-auto xl:w-1/2">
				<form className="flex flex-col mx-5" onSubmit={handleSubmit}>
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
						className="rounded-lg p-3 bg-rojo cursor-pointer mt-16 mb-6 text-[white]"
						value="ESTABLECE TU CONTRASEÑA"
					/>
				</form>
			</main>
		</>
	);
}

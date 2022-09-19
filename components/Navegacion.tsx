import Link from "next/link";
import { ReactElement } from "react";

interface Props {
	children?: ReactElement | any
}

export function Navegacion({ children }: Props) {
	return (
		<>
			<nav className="flex justify-between items-center sticky bg-rojo w-full px-4 h-[72px] top-0 z-10">
				<Link href="/">
					<a className="text-blanco font-bold md:text-lg">CANCELAR</a>
				</Link>
				{children}
			</nav>
		</>
	);
}

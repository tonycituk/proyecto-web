import Head from "next/head";

interface Props {
	title: string;
}

export function Header({ title }: Props) {
	return (
		<Head>
			<title>{title}</title>
			<link rel="shortcut icon" href="/img/logo.png" />
			<meta name="description" content="Gestión de almacén | CECATI" />
		</Head>
	);
}

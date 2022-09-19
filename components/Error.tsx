import Link from "next/link";

interface Props {
    title: string;
    body: string;
}

export function Error({title, body}: Props) {
	return (	
		<div className="flex flex-col justify-center h-screen mx-auto w-11/12 md:w-[760px]">
			<div className="p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200" role="alert">
			<div className="flex items-center">
				<svg className="mr-2 w-5 h-5 text-red-700 dark:text-red-800" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
				<span className="sr-only">Info</span>
				<h3 className="text-lg font-medium text-red-700 dark:text-red-800">{title}</h3>
			</div>
			<div className="mt-2 mb-4 text-sm text-red-700 dark:text-red-800">
				{body}
			</div>
			<div className="flex">
				<Link href="/">
					<a className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-800 dark:hover:bg-red-900">
						<svg className="-ml-0.5 mr-2 h-4 w-4" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" /> </svg>
						Regresar al menú
					</a>
				</Link>
			</div>
			</div>
		</div>
	);
}

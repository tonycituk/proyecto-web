import { ReactNode } from "react";

interface Props {
	children: ReactNode;
	handler: () => void;
}

export function FloatingButton({ children, handler }: Props) {
	return (
		<button
			type="button"
			onClick={handler}
			className="fixed right-8 bottom-8"
		>
			{children}
		</button>
	);
}

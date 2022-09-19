export const generateDate = (date: string = "") => {
	return new Date(date).toLocaleDateString("es-ES", {year: "numeric", month: "long", day: "2-digit"});
};

import { GetServerSideProps } from "next";
import { IProducto } from "../interfaces";

import { useSearch } from "../hooks";
import { validateJWT } from "../utils";
import { cecatiAPI } from "../services";
import { Buscador, Header, Navegacion, Producto } from "../components";

interface Props {
    productos: IProducto[];
}

export default function TarjetasDeAlmacen({ productos }: Props) {

    const { handleSearch, arrayFiltered } = useSearch(productos, "nombre");
    
    return (
        <>
            <Header title="Salida de articulos" />

            <Navegacion>
            </Navegacion>

            <h1 className="text-center uppercase text-[27px] font-bold py-8">
				Tarjetas de almacén
			</h1>

            <Buscador handleSearch={handleSearch} />

            {productos && 
                arrayFiltered.map((producto, index) => (
                    <Producto 
                        key={`Producto ${index}`}
                        producto={producto} 
                    />
                ))
            }
        </>
    )
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

	if ( !isValidToken ) {
		return {
			redirect: {
				destination: "/auth/login",
				permanent: false
			}
		}
	}

    const { "0": resProductos } = await Promise.all([cecatiAPI.get("/productos")]);

    return {
        props: {
            productos: resProductos.data
        }
    }
}
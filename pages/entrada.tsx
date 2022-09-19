import Link from "next/link";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import { useState, FormEvent } from "react";

import { cecatiAPI } from "../services";
import { validateJWT } from "../utils";
import { IEntrada, IPartida, IFactura } from "../interfaces";
import { Header, Navegacion, FormEntrada, FormProductosEntrada, FormResumenEntrada, FloatingButton } from "../components";

interface Props {
    partidas: IPartida[];
    facturas: IFactura[];
}

export default function Entrada({ partidas, facturas }: Props) {

    const [renderFormEntrada, setRenderFormEntrada] = useState(true);
    const [renderFormProductos, setRenderFormProductos] = useState(false);
    const [renderFormResumen, setRenderFormResumen] = useState(false);
    
    const [rendersCounter, setRendersCounter] = useState([1]);
    const callComponent = () => setRendersCounter([...rendersCounter, 1]);

    const [entrada, setEntrada] = useState<IEntrada>({} as IEntrada);

    const { register, getValues, handleSubmit } = useForm<IEntrada>();

    const renderFormProductosHandler = (e: FormEvent) => {
        e.preventDefault();

        if (getValues(["almacenista", "director", "elaborador", "factura", "fecha", "procedencia", "tipo"]).includes("")) {
            return alert("Todos los campos son obligatorios");
        }

        // Verificando que no exista una factura igual en la DB
        if (facturas.find(({factura}) => factura == getValues("factura"))) {
            return alert("La factura registrada ya se encuentra dentro del sistema");
        }

        setRenderFormEntrada(false);
        setRenderFormProductos(true);
    }

    const onSubmit = handleSubmit( async (data) => {
        try {
            await cecatiAPI.post("/entrada", data);
            alert("Entrada registrada correctamente.");

            setEntrada(data);
            setRenderFormProductos(false);
            setRenderFormResumen(true);

        } catch(error: (any | AxiosError)) {
            alert(error.response.data.validations[0].msg);
        }
    });

    return (
        <>
            <Header title="Entrada de articulos" />

            <Navegacion>
                {renderFormProductos && (
                    <button type="submit" form="entrada" className="flex text-blanco font-bold md:text-lg items-center">
                        <p className="pr-4">GUARDAR</p>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none"> <path d="M15 0C6.72909 0 0 6.72909 0 15C0 23.2709 6.72909 30 15 30C23.2709 30 30 23.2709 30 15C30 6.72909 23.2709 0 15 0ZM22.8065 9.97284L13.1142 21.5113C13.0079 21.6379 12.8756 21.7402 12.7263 21.8113C12.577 21.8823 12.4141 21.9205 12.2488 21.9231H12.2293C12.0676 21.923 11.9077 21.889 11.76 21.8231C11.6123 21.7573 11.48 21.6611 11.3719 21.5409L7.21803 16.9255C7.11254 16.8136 7.03047 16.6817 6.97666 16.5377C6.92285 16.3936 6.89838 16.2403 6.90469 16.0866C6.911 15.933 6.94795 15.7821 7.01339 15.643C7.07882 15.5038 7.17142 15.3791 7.28572 15.2763C7.40003 15.1734 7.53375 15.0944 7.67902 15.044C7.82429 14.9935 7.97817 14.9726 8.13163 14.9825C8.2851 14.9923 8.43504 15.0328 8.57264 15.1014C8.71025 15.1701 8.83275 15.2655 8.93293 15.3822L12.199 19.0111L21.0397 8.4887C21.238 8.25943 21.5185 8.11741 21.8207 8.09333C22.1229 8.06925 22.4224 8.16505 22.6545 8.36002C22.8866 8.555 23.0327 8.83348 23.0611 9.13527C23.0896 9.43707 22.9981 9.73793 22.8065 9.97284Z" fill="white"/> </svg>
                    </button>
                )}
                {renderFormResumen && (
                    <Link href="/">
                        <a className="flex text-blanco font-bold md:text-lg items-center">
                            <p className="pr-4">LISTO</p>
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none"> <path d="M15 0C6.72909 0 0 6.72909 0 15C0 23.2709 6.72909 30 15 30C23.2709 30 30 23.2709 30 15C30 6.72909 23.2709 0 15 0ZM22.8065 9.97284L13.1142 21.5113C13.0079 21.6379 12.8756 21.7402 12.7263 21.8113C12.577 21.8823 12.4141 21.9205 12.2488 21.9231H12.2293C12.0676 21.923 11.9077 21.889 11.76 21.8231C11.6123 21.7573 11.48 21.6611 11.3719 21.5409L7.21803 16.9255C7.11254 16.8136 7.03047 16.6817 6.97666 16.5377C6.92285 16.3936 6.89838 16.2403 6.90469 16.0866C6.911 15.933 6.94795 15.7821 7.01339 15.643C7.07882 15.5038 7.17142 15.3791 7.28572 15.2763C7.40003 15.1734 7.53375 15.0944 7.67902 15.044C7.82429 14.9935 7.97817 14.9726 8.13163 14.9825C8.2851 14.9923 8.43504 15.0328 8.57264 15.1014C8.71025 15.1701 8.83275 15.2655 8.93293 15.3822L12.199 19.0111L21.0397 8.4887C21.238 8.25943 21.5185 8.11741 21.8207 8.09333C22.1229 8.06925 22.4224 8.16505 22.6545 8.36002C22.8866 8.555 23.0327 8.83348 23.0611 9.13527C23.0896 9.43707 22.9981 9.73793 22.8065 9.97284Z" fill="white"/> </svg>
                        </a>
                    </Link>
                )}
            </Navegacion>

            <form id="entrada" onSubmit={onSubmit} >
                {renderFormEntrada &&
                    <FormEntrada 
                        register={register}
                        renderFormProductosHandler={renderFormProductosHandler} 
                    />
                }

                {renderFormProductos && 
                    rendersCounter.map((_, index) => 
                        <FormProductosEntrada 
                            key={index} 
                            index={index} 
                            partidas={partidas} 
                            register={register} 
                        />)
                }
            </form>

            {renderFormProductos && 
                <FloatingButton handler={callComponent}>
                    <svg width="60" height="60" viewBox="0 0 85 85" fill="none"> <circle cx="42.5" cy="42.5" r="42.5" fill="#D43031" /> <path d="M57.8002 42.925H27.2002M42.5002 27.2V58.65V27.2Z" stroke="#EEEEEE" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                </FloatingButton>  
            }

            {renderFormResumen && <FormResumenEntrada data={entrada} /> }
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

    const { "0": resPartidas, "1": resFacturas } = await Promise.all([cecatiAPI.get("/partidas"), cecatiAPI.get("/facturas")]);

    return {
        props: {
            partidas: resPartidas.data,
            facturas: resFacturas.data
        }
    }
}
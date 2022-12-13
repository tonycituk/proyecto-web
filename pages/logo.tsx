import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

import { useRouter } from "next/router";
import { Header, Navegacion } from "../components";

interface Props {
  dirs: string[];
}



const Image: NextPage<Props> = ({ dirs }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [disabled, disableButton] = useState(true);
  const router = useRouter();



  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/image", formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response?.data);
    }
    //setUploading(false);
    alert("¡Felicidades! Haz cambiado el logo de la Aplicación.");

    router.push("/");
  };



  return (
    <>
      <Header title="Cambiar Logo" />
      <Navegacion></Navegacion>

      <h1 className="text-center uppercase text-[27px] font-bold py-8">
        Cambiar logo
      </h1>


      <div className="max-w-4xl mx-auto p-20 space-y-6">
        <label>
          <input
            type="file"
            hidden
            onChange={({ target }) => {
              if (target.files) {
                const file = target.files[0];
                setSelectedImage(URL.createObjectURL(file));
                setSelectedFile(file);
                disableButton(false);
              }
            }}
          />
          <div className="w-70 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
            {selectedImage ? (
              <img src={selectedImage} alt="" />
            ) : (
              <span>Seleccionar Imagen</span>
            )}
          </div>
        </label>

        <button
          onClick={handleUpload}
          disabled={uploading || disabled}
          style={{ opacity: uploading || disabled ? ".5" : "1" }}
          className="bg-red-600 p-3 w-40 text-center rounded text-white"
        >
          {uploading ? "Subiendo..." : "Subir imagen"}
        </button>

      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const props = { dirs: [] };
  try {
    const dirs = await fs.readdir(path.join(process.cwd(), "/public/img"));
    props.dirs = dirs as any;
    return { props };
  } catch (error) {
    return { props };
  }
};

export default Image;


import { Button } from "@nextui-org/react";
import { useAuthStore } from "../../hooks";

export const InitPage = () => {

  const { isLoading, inicialization } = useAuthStore();

  const handleClick = () => {
    inicialization()
  }

  return (
    <div className="bg-slate-900 h-screen flex flex-col items-center justify-center">

      <img className="w-11/12 md:w-1/4" src="/assets/logo.png" alt="Logo.png" />

      <p className="text-white mt-4"> Sistema desarrollado por Equinoccio Technology </p>

      {

        !isLoading ?

          <Button color="secondary" className="mt-7" onClick={handleClick}>
            Inicializar sistema
          </Button>

          :

          <Button className='mt-4' color="secondary" isLoading>
            Cargando
          </Button>

      }

    </div>
  )
}


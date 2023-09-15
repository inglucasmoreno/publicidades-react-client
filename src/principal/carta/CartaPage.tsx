import { Button } from "@nextui-org/react"
import { BookIcon } from "../../icons"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCarta } from "../../hooks";

export const CartaPage = () => {

  const [errorForm, setErrorForm] = useState('');
  const { register, handleSubmit, reset } = useForm<any>();
  const { subirCarta, isLoadingCarta } = useCarta();

  const onSubmit = handleSubmit((data: any) => {

    if (data.file[0]) { // REQUIRED

      if (data.file[0].type === 'application/pdf') { // TYPE - PDF

        if (data.file[0].size < 2000000) { // SIZE - 2MB
          const formData = new FormData();
          formData.append('file', data.file[0]);
          subirCarta(formData);
          setErrorForm('');
          reset();
        } else {
          setErrorForm('El PDF no puede pesar mas de 2MB');
        }

      } else {
        setErrorForm('El archivo debe ser PDF');
      }

    } else {
      setErrorForm('Debe seleccionar un archivo PDF');
    }

  })

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div>
        <h1 className="text-5xl"> CARTA DIGITAL </h1>
        <h2 className="text-zinc-400 text-center mt-4"> CONFIGURACIONES </h2>
      </div>
      <div className="mt-7">
        <a className="text-white bg-secondary py-2 px-4 rounded-lg flex items-center" href={`${import.meta.env.VITE_API_URL}pdf/VeneziaPanaderia.pdf`} target="_blank">
          <BookIcon />
          <span className="ml-2"> Ver carta actual </span>
        </a>
      </div>
      <div className="mt-7 bg-gray-100 border border-gray-400 dark:bg-zinc-900 dark:border-zinc-700 rounded-t shadow-xl">
        <h2 className="mb-5 text-center bg-secondary text-white p-1"> Actualizar carta </h2>
        <form onSubmit={onSubmit} className="p-4">
          <div>
            <input
              {...register('file')}
              type="file"
            />
          </div>
          <p className="text-sm mt-2 text-red-500">
            {errorForm}
          </p>

          {
            !isLoadingCarta ?
              <Button type="submit" className="w-full mt-5" variant="solid" color="secondary">
                Subir carta
              </Button>
              :
              <Button isDisabled isLoading className="w-full mt-5" variant="solid" color="secondary">
                Subiendo carta
              </Button>
          }
        </form>
      </div>
    </div>
  )
}


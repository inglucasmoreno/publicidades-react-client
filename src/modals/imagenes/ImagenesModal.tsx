
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { useUiStore } from '../../hooks/useUiStore';
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useImagenesStore } from "../../hooks";
import { IImagenes } from "../../interfaces";

export const ImagenesModal = () => {

  const { isImagenOpen, toggleImagen } = useUiStore();
  const { activeImagen, updateImagen, addNewImagen, isLoadingImagenesModal } = useImagenesStore();
  const { register, reset, handleSubmit, formState: { errors } } = useForm<IImagenes>();

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isImagenOpen) {
      const probando = new FormData();
      probando.append('testing', 'testing');
      console.log(probando);
      reset();
    }
  }, [isImagenOpen])

  const onSubmit = handleSubmit((data: any) => {

    if (activeImagen.id !== 0) {
      updateImagen(data);
    } else {
      const formData = new FormData();
      formData.append('descripcion', data.descripcion);
      formData.append('file', data.file[0]);
      addNewImagen(formData);
    }

  })

  return (
    <Modal isDismissable={false} isOpen={isImagenOpen} onOpenChange={() => toggleImagen()}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            {
              activeImagen.id === 0 ? 'Nueva imagen' : 'Actualizando imagen'
            }
          </ModalHeader>

          <ModalBody className="pb-5">

            <form onSubmit={onSubmit}>

              <Input
                type="text"
                autoFocus
                variant="bordered"
                defaultValue={activeImagen.id === 0 ? '' : activeImagen.descripcion}
                validationState={errors.descripcion ? 'invalid' : 'valid'}
                errorMessage={errors?.descripcion?.message}
                label="Descripcion"
                {...register('descripcion', {
                  required: { value: true, message: 'El campo es obligatorio' }
                })}
              />

              {
                activeImagen.id === 0 &&
                <input
                  ref={fileInputRef}
                  {...register('file', {
                    required: { value: true, message: 'El campo es obligatorio' },
                    validate: (value) => {
                      const formato = value[0].type.split('/')[1];
                      const condicion = formato !== 'png' && formato !== 'jpg' && formato !== 'jpeg' && formato !== 'gif';
                      if (condicion) {
                        return 'El archivo debe ser una imagen';
                      } else if (value[0].size > 2000000) {
                        return 'La imagen debe pesar menos de 2MB';
                      } else {
                        return true
                      }
                    }
                  })}
                  className="mt-4"
                  type="file"
                />
              }


              <p className="text-red-600 text-xs mt-1">
                {errors?.file?.message.toString()}
              </p>

              {
                !isLoadingImagenesModal
                  ?
                  <Button type="submit" className="text-white mt-6 w-full" variant="solid" color="success">
                    {
                      activeImagen.id === 0 ? 'Crear imagen' : 'Actualizar imagen'
                    }
                  </Button>
                  :
                  <Button isLoading className="text-white mt-6 w-full" color="success" variant="solid">
                    Cargando
                  </Button>
              }

            </form>

          </ModalBody>

        </>
      </ModalContent>
    </Modal>
  )
}

